import React from "react";
import Link from "next/link";

const BarCodeCard = ({
  name = "california ",
  location = "California Street ",
  image = "/californiaSt.png",
  cityId = "SanFrancisco",
  id = 0,
}) => {
  return (
    <div className=" p-2 bg-blue-900 hover:text-black w-[200px] md:w-[300px] h-[400px] rounded-2xl  hover:bg-white  backdrop-blur-sm hover:backdrop-blur-lg    flex flex-col justify-center hover:shadow-black items-center   bg-opacity-0   text-white hover:bg-opacity-50 hover:shadow-2xl transition-all duration-1000 ease-in ">
      <Link href={`/cities/${cityId}/${id}`}>
        <h1 className="p-2 absolute top-2 left-2 shadow-inner  text-white  text-xs rounded-md  transition-all duration-1000 ease-in hover:bg-black hover:text-white ">
          More
        </h1>
      </Link>
      <img className="w-[200px] h-[200px] shadow-2xl" src={image}></img>
      <h1 className="p-2 text-md mt-2 text-white">{location}</h1>
      <h2 className="p-2 text-md mt-2   ">{name}</h2>
    </div>
  );
};

export default BarCodeCard;
