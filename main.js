import { initThree } from "./src/initThree";
import { loadGLTF } from "./src/loadGLTF";

const textures = {
  wood: {
    urlAlbedo: "textures/wooden-planks/albedo.png",
    urlNormal: "textures/wooden-planks/normal.png",
  },
  brick: {
    urlAlbedo: "textures/brick-wall/albedo.png",
    urlNormal: "textures/brick-wall/normal.png",
  },
  stone: {
    urlAlbedo: "textures/mossy-stone/albedo.png",
    urlNormal: "textures/mossy-stone/normal.png",
  },
};

const catModelUrl = "models/cat.glb";

window.addEventListener("DOMContentLoaded", function () {
  const loadCatModelBtn = document.querySelector("button");

  loadCatModelBtn.addEventListener("onclick", function () {
    loadGLTF(scene, catModelUrl);
  });

  initThree(textures);
});
