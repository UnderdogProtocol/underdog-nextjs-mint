import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const rpcEndpoint = process.env.RPC_ENDPOINT;

  if (!rpcEndpoint) return res.status(400).json("RPC endpoint not found");

  const response = await axios.post(rpcEndpoint, req.body);

  res.status(200).json(response.data);
});

export default router.handler();
