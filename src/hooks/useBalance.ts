import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

export const useBalance = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  return useQuery<number>(["balance"], async () => {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      return balance / 1e9;
    } else {
      return 0;
    }
  });
};
