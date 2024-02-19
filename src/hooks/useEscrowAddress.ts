import { publicKey } from "@metaplex-foundation/umi";

export const useEscrowAddress = () => {
  const escrowAddress = process.env.NEXT_PUBLIC_ESCROW_PUBLIC_KEY;

  if (!escrowAddress)
    throw new Error("NEXT_PUBLIC_ESCROW_PUBLIC_KEY is not set");

  return publicKey(escrowAddress);
};
