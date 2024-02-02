import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";

export const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

export const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

export const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

export const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

export const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 60,
  specularColor: [51, 51, 51],
};

export const INITIAL_VIEW_STATE = {
  longitude: -80.189194,
  latitude: 25.843882,
  zoom: 11,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27,
};

export const colorRange = [
  [255, 0, 0, 128],
  [255, 0, 0, 255],
  [255, 0, 0, 255],
  [255, 0, 0, 255],
  [255, 0, 0, 255],
  [255, 0, 0, 255],
];
