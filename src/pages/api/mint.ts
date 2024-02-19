import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { transfer } from "@metaplex-foundation/mpl-bubblegum";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";
import {
  AccountMeta,
  Umi,
  createNoopSigner,
  createSignerFromKeypair,
  keypairIdentity,
  publicKey,
  publicKeyBytes,
  sol,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { base58, base64 } from "@metaplex-foundation/umi/serializers";
import axios from "axios";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

type MintApiRequest = NextApiRequest & {
  context: Umi;
};

const router = createRouter<MintApiRequest, NextApiResponse>();

const {
  ESCROW_SECRET_KEY,
  RPC_ENDPOINT,
  NEXT_PUBLIC_PRICE,
  NEXT_PUBLIC_COLLECTION_MINT_ADDRESS,
} = process.env;

if (
  !(
    ESCROW_SECRET_KEY &&
    RPC_ENDPOINT &&
    NEXT_PUBLIC_PRICE &&
    NEXT_PUBLIC_COLLECTION_MINT_ADDRESS
  )
)
  throw new Error("Required env variables not set");

const price = parseFloat(NEXT_PUBLIC_PRICE);

router.use(async (req, res, next) => {
  const context = createUmi(RPC_ENDPOINT);

  const keypair = context.eddsa.createKeypairFromSecretKey(
    base58.serialize(ESCROW_SECRET_KEY)
  );
  context.use(keypairIdentity(createSignerFromKeypair(context, keypair)));
  context.use(dasApi());

  req.context = context;

  return next();
});

router.post(async (req, res) => {
  const { context } = req;

  try {
    const receiverAddress = publicKey(req.body.account);

    const assets = await context.rpc.searchAssets({
      owner: context.identity.publicKey,
      grouping: ["collection", NEXT_PUBLIC_COLLECTION_MINT_ADDRESS],
      limit: 1000,
      page: 1,
    });

    if (assets && assets.total > 0) {
      const asset = _.sample(assets.items) || assets.items[0];
      const assetProof = await context.rpc.getAssetProof(asset.id);

      const proof: AccountMeta[] = assetProof.proof
        .slice(0, assetProof.proof.length - 9)
        .map((pubkey) => ({ pubkey, isSigner: false, isWritable: false }));

      let builder = transactionBuilder()
        .add(
          transferSol(context, {
            amount: sol(price),
            destination: context.identity.publicKey,
            source: createNoopSigner(receiverAddress),
          })
        )
        .add(
          transfer(context, {
            leafOwner: context.identity.publicKey,
            newLeafOwner: publicKey(receiverAddress),
            merkleTree: publicKey(asset.compression.tree),
            root: publicKeyBytes(assetProof.root),
            dataHash: publicKeyBytes(asset.compression.data_hash),
            creatorHash: publicKeyBytes(asset.compression.creator_hash),
            nonce: asset.compression.leaf_id,
            index: asset.compression.leaf_id,
          }).addRemainingAccounts(proof)
        );

      const serializedTransaction = context.transactions.serialize(
        await builder.buildAndSign(context)
      );

      const base64Transaction = base64.deserialize(serializedTransaction)[0];

      res.status(200).json({ transaction: base64Transaction });
    }
  } catch (e) {
    res.status(400).json({ message: "There was a problemo" });
  }
});

export default router.handler();
