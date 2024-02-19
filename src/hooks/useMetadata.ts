import {
  Metadata,
  fetchMetadataFromSeeds,
} from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@metaplex-foundation/umi";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "./useContext";

export const useMetadata = (mintAddress?: PublicKey) => {
  const context = useContext();

  return useQuery<Metadata | undefined>(
    ["metadata", mintAddress],
    async () => {
      if (mintAddress) {
        return fetchMetadataFromSeeds(context, { mint: mintAddress });
      }
    },
    { enabled: !!mintAddress }
  );
};
