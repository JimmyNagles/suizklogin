// pages/api/zk-proof.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { extendedEphemeralPublicKey, maxEpoch, jwtRandomness, salt, jwt } =
    req.body;

  console.log(extendedEphemeralPublicKey);
  console.log(maxEpoch);
  console.log(jwtRandomness);
  console.log(salt);
  console.log(jwt);

  try {
    const zkProofResult = await axios.post(
      "https://prover-dev.mystenlabs.com/v1",
      {
        jwt,
        extendedEphemeralPublicKey,
        maxEpoch,
        jwtRandomness,
        salt,
        keyClaimName: "sub",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Assuming the response from the ZK proving service is in the correct format
    const partialZkLoginSignature = zkProofResult.data;

    res.status(200).json(partialZkLoginSignature);
  } catch (error) {
    console.error("Error requesting ZK proof:", error);
    res.status(500).json({ error: "Error requesting ZK proof" });
  }
}
