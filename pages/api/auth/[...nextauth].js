import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import {
  generateNonce,
  generateRandomness,
  jwtToAddress,
  getExtendedEphemeralPublicKey,
} from "@mysten/zklogin";
import { SuiClient } from "@mysten/sui.js/client";

import { jwtDecode } from "jwt-decode"; // Use named import for jwtDecode

const FULLNODE_URL = "https://fullnode.devnet.sui.io"; // Replace with the appropriate URL for your network
const suiClient = new SuiClient({ url: FULLNODE_URL });

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      console.log("user function Callback", user);
      console.log("acount function Callback", account);
      console.log("token function Callback", token);

      if (account && user) {
        // Generate an ephemeral key pair
        const ephemeralKeyPair = new Ed25519Keypair();
        const publicKey = ephemeralKeyPair.getPublicKey();
        const privateKey = ephemeralKeyPair.export().privateKey;
        console.log("Public Key", publicKey);
        console.log("Public Key", publicKey.toBase64());

        console.log("private Key", privateKey);

        // Generate randomness and nonce
        const randomness = generateRandomness();
        console.log("randomeNess", randomness);
        const { epoch } = await suiClient.getLatestSuiSystemState();

        const maxEpoch = epoch + 10; // Set the maxEpoch to 2 epochs from the current epoch
        console.log("epoch", epoch);
        console.log("maxEpoch", maxEpoch);

        const nonce = generateNonce(publicKey, maxEpoch, randomness); // Assuming maxEpoch is 2
        console.log("NONCE ", nonce);
        const stringtoken = JSON.stringify(account.id_token);
        console.log(stringtoken);

        // Generate a random user salt
        const userSalt = generateRandomness();
        console.log("User Salt:", userSalt);

        const zkLoginUserAddress = jwtToAddress(stringtoken, userSalt);

        console.log("ZK ADDRESS", zkLoginUserAddress);
        const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
          ephemeralKeyPair.getPublicKey()
        );

        console.log("EXTENDED KEY LOG", extendedEphemeralPublicKey);
        // Store the ephemeral private key, nonce, and randomness in the token for later use
        token.zkLoginUserAddress = zkLoginUserAddress;
        token.jwt = account.id_token;
        token.ephemeralPrivateKey = privateKey;
        token.ephemeralPublicKey = publicKey.toBase64(); // Store the base64 representation of the public key
        token.extendedEphemeralPublicKey = extendedEphemeralPublicKey; // Store the extended public key
        token.nonce = nonce;
        token.randomness = randomness;
        token.maxEpoch = maxEpoch;
        token.userSalt = userSalt;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session functions callback", session);
      console.log(user);
      session.userId = token.userId;
      session.jwt = token.jwt;
      session.ephemeralPrivateKey = token.ephemeralPrivateKey;
      session.ephemeralPublicKey = token.ephemeralPublicKey;
      session.extendedEphemeralPublicKey = token.extendedEphemeralPublicKey; // Pass the extended public key to the session
      session.nonce = token.nonce;
      session.randomness = token.randomness;
      session.zkLoginUserAddress = token.zkLoginUserAddress;
      session.maxEpoch = token.maxEpoch;
      session.userSalt = token.userSalt;
      return session;
    },
  },

  // Add any other desired NextAuth.js configuration options here
});
