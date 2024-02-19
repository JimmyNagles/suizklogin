import React from "react";
import { DataArrSF, DataArrMia } from "../../lib/data";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
const MyMapbox = dynamic(() => import("../../components/map/MyMapbox"), {
  ssr: false,
});
import BarCodeCard from "../../components/cards/BarCodeCard";
const NFTgated = () => {
  const [coordinates, setCoordinates] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  const cityViewState = {
    longitude: -122.41669, // Longitude for San Francisco
    latitude: 37.774929, // Latitude for San Francisco
    zoom: 12, // Initial zoom level
    pitch: 40.5, // Pitch of the map view
    bearing: -27, // Bearing of the map view
    minZoom: 5, // Minimum zoom level
    maxZoom: 15, // Maximum zoom level
  };

  useEffect(() => {
    if (!session) {
      router.push("/");
      return;
    }
    // Create an array of geo coordinates pairs
    const coords = DataArrSF.map((item) => {
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
    <main className="flex min-h-screen flex-col items-center justify-between    ">
      <div className="p-2 min-h-[50vh] ">
        <MyMapbox initalViewStateProp={cityViewState} data={coordinates} />
      </div>
      <div className=" text-black w-full flex flex-row-reverse z-20 ">
        <button
          className="flex items-center justify-center h-full w-full p-4  bg-blue-950 shadow-slate-900 shadow-2xl  bg-opacity-0  hover:bg-opacity-100 hover:shadow-2xl transition-all duration-1000 ease-in  hover:text-white text-black   "
          onClick={() => {
            signOut();
          }}
        >
          LogOut
        </button>
      </div>
      <div className="  min-h-screen  w-full flex justify-center bg-blue-950 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-items-center lg:grid-cols-3 gap-4  p-5 ">
          {DataArrSF.map((item, index) => (
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
