"use client";
import React, { useState } from "react";

import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";

import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapView, FirstPersonView } from "@deck.gl/core";

// import map config
import {
  lightingEffect,
  material,
  INITIAL_VIEW_STATE,
  colorRange,
} from "../../lib/mapconfig.js";

const MyMapbox = ({
  upperPercentile = 100,
  coverage = 1,
  data,
  initalViewStateProp,
}) => {
  // creating tooltip
  function getTooltip({ object }) {
    console.log(object);
    if (!object) {
      return null;
    }
    // Accessing the first point in the points array
    const firstPoint = object.points[0].source;

    const lat = firstPoint.position[1];
    const lng = firstPoint.position[0];
    const name = firstPoint.name;
    const location = firstPoint.location;

    return `\
     Name: ${name}\n
     Location: ${location}\n
     Latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
     Longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}`;
  }

  const layers = [
    new HexagonLayer({
      id: "heatmap",
      coverage,
      data,
      colorRange: colorRange,
      elevationRange: [0, 500],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: (d) => d.position,
      pickable: true,
      radius: 30,
      upperPercentile,
      material,

      transitions: {
        elevationScale: 3000,
      },
    }),
  ];

  return (
    <div className="">
      <DeckGL
        className=""
        layers={layers}
        effects={[lightingEffect]}
        initialViewState={initalViewStateProp || INITIAL_VIEW_STATE}
        controller={true}
        getTooltip={getTooltip}
      >
        <MapView id="map" width="100%" height="50%" controller={true}>
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/light-v11"
          ></Map>
        </MapView>
      </DeckGL>
    </div>
  );
};

export default MyMapbox;
