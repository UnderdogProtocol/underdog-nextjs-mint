import { PublicKeyInitData } from "@solana/web3.js";

export const shortenAddress = (address: PublicKeyInitData, chars = 4) => {
  return `${address.toString().slice(0, chars)}...${address
    .toString()
    .slice(-chars)}`;
};
