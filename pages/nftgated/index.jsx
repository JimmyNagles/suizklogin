import React from "react";
import { DataArrSF, DataArrMia } from "../../lib/data";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const MyMapbox = dynamic(() => import("../../components/map/MyMapbox"), {
  ssr: false,
});
import BarCodeCard from "../../components/cards/BarCodeCard";
const NFTgated = () => {
  const [coordinates, setCoordinates] = useState([]);

  const cityViewState = {
    longitude: -80.189194,
    latitude: 25.820882,
    zoom: 12,
    minZoom: 5,
    maxZoom: 15,
    pitch: 40.5,
    bearing: -27,
  };
  useEffect(() => {
    // Create an array of geo coordinates pairs
    const coords = DataArrMia.map((item) => {
      return {
        position: [item.long, item.lat],
        // Include other properties you might need for the tooltip
        name: item.name,
        location: item.location,
      };
    });
    setCoordinates(coords);

    console.log(coordinates);
  }, []);
  //
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-blue-950   ">
      <div className="p-2 min-h-[50vh]">
        <MyMapbox initalViewStateProp={cityViewState} data={coordinates} />
      </div>

      <div className="  min-h-screen  w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-items-center lg:grid-cols-3 gap-4  p-5 ">
          {DataArrMia.map((item, index) => (
            <BarCodeCard
              key={index}
              image={item.image}
              name={item.name}
              location={item.location}
              id={index + 1}
              cityId="SanFrancisco"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default NFTgated;
