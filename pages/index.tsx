import HowItWorks from "@/components/landing/HowItWorks";
import WhatWeAre from "@/components/landing/WhatWeAre";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <main
      className={`min-h-screen bg-blue-950 text-gray-800 flex flex-col justify-center items-center  ${inter.className}`}
    >
      <div className="min-h-screen  flex flex-col justify-center text-white">
        <h1 className="text-lg">Welcome To </h1>
        <h1 className="text-4xl">Sui Monsters</h1>
        <Link href={"/login"}>
          <button className="p-4  bg-blue-900 mt-8 shadow-inner bg-opacity-20  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in w-full text-white   rounded-2xl  ">
            Click to Start
          </button>
        </Link>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          ↓
        </div>
      </div>

      <WhatWeAre></WhatWeAre>

      <HowItWorks></HowItWorks>
      <div className="mb-20"></div>
      <Link href={"/nftgated"}>
        <button className="p-4  bg-blue-900 w-[200px] mt-8 shadow-inner bg-opacity-20  hover:bg-opacity-80 hover:shadow-2xl transition-all duration-1000 ease-in  text-white   rounded-2xl">
          Click to Start
        </button>
      </Link>
      <div className="mb-20"></div>
    </main>
  );
}
