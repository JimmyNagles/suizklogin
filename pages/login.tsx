import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { getExtendedEphemeralPublicKey } from "@mysten/zklogin";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [extendedEphemeralPublicKey, setExtendedEphemeralPublicKey] =
    useState(null);
  const [zkProof, setZkProof] = useState(null);

  const requestFaucet = async (zkLoginUserAddress) => {
    if (!zkLoginUserAddress) {
      console.log("No address provided");
      return;
    }
    try {
      const response = await axios.post("/api/faucet", {
        zkLoginUserAddress,
      });
      console.log("Faucet request successful:", response.data);
    } catch (error) {
      console.error("Faucet request failed:", error);
    }
  };

  const requestZkProof = async () => {
    if (!session.extendedEphemeralPublicKey) {
      console.log("Extended ephemeral public key not available");
      return;
    }
    try {
      // Request the ZK proof
      const response = await axios.post("/api/zk-proof", {
        extendedEphemeralPublicKey: session.extendedEphemeralPublicKey,
        maxEpoch: session.maxEpoch,
        jwtRandomness: session.randomness,
        salt: session.userSalt,
        jwt: session.jwt, // Assuming the ID token is stored in the session
      });
      setZkProof(response.data);
      console.log("ZK proof request successful:", response.data);
    } catch (error) {
      console.error("ZK proof request failed:", error);
    }
  };

  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col justify-center items-center">
      {session ? (
        <div className="text-black w-full flex flex-col z-20">
          <button
            className="flex items-center justify-center h-full w-full p-4 bg-blue-950 shadow-slate-900 shadow-2xl bg-opacity-0 hover:bg-opacity-100 hover:shadow-2xl transition-all duration-1000 ease-in hover:text-white text-black"
            onClick={() => {
              signOut();
            }}
          >
            LogOut
          </button>

          <div className="min-h-screen p-10 bg-white text-black">
            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.user?.email}
            </h1>
            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.user?.name}
            </h1>
            <h1 className="p-2 mt-2"> ephemera private KEY</h1>
            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.ephemeralPrivateKey}
            </h1>
            <h1 className="p-2 mt-2"> ephemera Public KEY</h1>
            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.ephemeralPublicKey}
            </h1>
            <h1 className="p-2 mt-2">Public KEY</h1>

            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.zkLoginUserAddress}
            </h1>

            <button
              onClick={() => requestFaucet(session.zkLoginUserAddress)}
              className="mt-4 p-4 bg-blue-950 text-white "
            >
              Request SUI from Faucet
            </button>
            <h1 className="p-2 mt-2">SALT</h1>
            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.userSalt}
            </h1>
            <h1 className="p-2 mt-2">EXPIRES</h1>

            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.expires}
            </h1>

            <h1 className="p-2 mt-2">MAXEPOCH</h1>

            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.maxEpoch}
            </h1>
            <h1 className="p-2 mt-2">NOUNCE</h1>

            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.nonce}
            </h1>
            <h1 className="p-2 mt-2">RANDOMNESS</h1>

            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.randomness}
            </h1>
            <h1 className="p-2 mt-2">Extended Ephemeral Public Key</h1>
            <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
              {session.extendedEphemeralPublicKey}
            </h1>

            <button
              onClick={requestZkProof}
              className="mt-4 p-4 bg-blue-950 text-white "
            >
              Generate ZK Proof
            </button>

            {/* Display the ZK proof */}
            {zkProof && (
              <div>
                <h1 className="p-2 mt-2">Zero-Knowledge Proof</h1>
                <h1 className="p-4 mt-2 bg-blue-950 text-white rounded-md">
                  {JSON.stringify(zkProof)}
                </h1>
              </div>
            )}
          </div>

          {/* Display the extended ephemeral public key */}
        </div>
      ) : (
        <form className="w-[250px] h-[300px] bg-blue-950 rounded-md p-6 flex flex-col justify-center glass-effect">
          <button
            className="h-[40px] mt-4 p-2 bg-orange-950 hover:bg-red-900 transition-all duration-1000 text-white glass-effect rounded-md"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In With Google
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
