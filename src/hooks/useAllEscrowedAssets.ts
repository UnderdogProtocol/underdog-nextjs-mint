import { useQuery } from "@tanstack/react-query";
import { useContext } from "./useContext";
import { useEscrowAddress } from "./useEscrowAddress";
import { DasApiAsset } from "@metaplex-foundation/digital-asset-standard-api";
import { useCollectionMintAddress } from "./useCollectionMintAddress";

export const useAllEscrowedAssets = () => {
  const context = useContext();
  const escrowAddress = useEscrowAddress();
  const collectionMintAddress = useCollectionMintAddress();

  return useQuery(["all-escrowed-assets", escrowAddress], async () => {
    const assets: DasApiAsset[] = [];
    let page = 1;

    while (true) {
      const assetList = await context.rpc.searchAssets({
        owner: escrowAddress,
        grouping: ["collection", collectionMintAddress],
        limit: 1000,
        page,
      });

      assets.push(...assetList.items);

      if (assetList.total < assetList.limit) {
        break;
      }
      console.log(assets);

      page++;
    }

    return assets;
  });
};
