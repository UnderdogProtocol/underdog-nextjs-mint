import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { UNDERDOG_API_KEY, NEXT_PUBLIC_ESCROW_PUBLIC_KEY } = process.env;

if (!(UNDERDOG_API_KEY && NETWORK && NEXT_PUBLIC_ESCROW_PUBLIC_KEY))
  throw new Error("Missing required environment variables");

export const underdog = axios.create({
  baseURL: "https://devnet.underdogprotocol.com",
  // baseURL: "https://mainnet.underdogprotocol.com",
  headers: { Authorization: `Bearer ${UNDERDOG_API_KEY}` },
});

export const config = {
  projectId: 16,
  escrowAddress: NEXT_PUBLIC_ESCROW_PUBLIC_KEY,
};
