import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadGLTF(scene, url) {
  const loader = new GLTFLoader();

  loader.load(
    url,
    function (gltf) {
      console.log(gltf);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}
