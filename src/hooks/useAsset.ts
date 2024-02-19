import { PublicKey } from "@metaplex-foundation/umi";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "./useContext";

export const useAsset = (id?: PublicKey) => {
  const context = useContext();

  return useQuery(
    ["asset", id],
    async () => (id ? context.rpc.getAsset(id) : undefined),
    { enabled: !!id }
  );
};
