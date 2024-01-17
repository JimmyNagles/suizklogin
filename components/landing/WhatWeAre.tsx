import React from "react";

const WhatWeAre = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full md:min-h-[600px]">
      <div className="w-full h-full flex flex-col justify-center items-center p-8">
        <h1 className="text-blue-500 text-4xl text-center ">
          What are Sui Monsters?
        </h1>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center  md:-mt-0 p-8">
        <h1 className="text-white text-sm  md:text-base text-center w-4/5  p-8 shadow-2xl border border-blue-500 rounded-lg hover:bg-blue-900 transition-all duration-1000 ease-in">
          Embarking on a journey to create AR experiences, I dove into mastering
          Blender, aiming to craft 100 3D models. The initial ones were a
          learning curve, but the latter half showcases a significant leap in
          creativity evolving from basic rocks to more intricate and dynamic
          forms. Though I acknowledge theres room for improvement, this
          collection marks the first chapter (V1) of my evolving models, soon to
          be scattered across 100 unique locations. Exciting times ahead!
        </h1>
      </div>
    </div>
  );
};

export default WhatWeAre;
