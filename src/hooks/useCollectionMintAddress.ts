import { publicKey } from "@metaplex-foundation/umi";

export const useCollectionMintAddress = () => {
  const collectionMintAddress = process.env.NEXT_PUBLIC_COLLECTION_MINT_ADDRESS;

  if (!collectionMintAddress)
    throw new Error("NEXT_PUBLIC_COLLECTION_MINT_ADDRESS is not set");

  return publicKey(collectionMintAddress);
};
