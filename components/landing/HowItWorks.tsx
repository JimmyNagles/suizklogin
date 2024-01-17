import React from "react";

const HowItWorks = () => {
  return (
    <section className="grid grid-cols-1 w-full content-center justify-items-center min-h-[600px] mt-12">
      <h2 className=" text-4xl  mb-12 mt-12 text-blue-500">How It Works</h2>

      <div className="text-white mt-8 ">
        {steps.map((step, index) => (
          <div
            key={index}
            className=" border border-blue-500 p-8 rounded-2xl shadow-2xl mb-8  hover:bg-blue-900 transition-all duration-1000 ease-in "
          >
            <p className="mb-2 text-blue-500">{step.title}</p>
            <p className="">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Log in with Google",
    description:
      "Begin your AR-EXP journey by logging in with your Google account.",
  },
  {
    title: "Discover Locations in Real Life",
    description: "Explore the physical world to uncover AR-EXP locations.",
  },
  {
    title: "Tap 3D Model",
    description:
      "Once you find an AR-EXP, interact with it by tapping on the 3D model.",
  },
  {
    title: "Claim on Minting Page",
    description:
      "Dive into the minting page where you can claim your discovered AR-EXP.",
  },
];

export default HowItWorks;
