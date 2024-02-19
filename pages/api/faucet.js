// pages/api/faucet.js
import axios from "axios";
import { requestSuiFromFaucetV0, getFaucetHost } from "@mysten/sui.js/faucet";

const SUI_DEVNET_FAUCET = "https://faucet.devnet.sui.io/gas";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { zkLoginUserAddress } = req.body;
      // Log the address to make sure we're getting it correctly
      console.log("Recipient address:", zkLoginUserAddress);
      // Perform the request using the Sui TypeScript SDK
      const response = await requestSuiFromFaucetV0({
        host: getFaucetHost("testnet"),
        recipient: zkLoginUserAddress,
      });

      // Log the SUI faucet response
      console.log("Faucet response:", response.data);

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error requesting the SUI faucet:", error);
      res
        .status(500)
        .json({ error: "Faucet request failed", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
