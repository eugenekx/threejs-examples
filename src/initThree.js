import * as THREE from "three";
import { getMaterial } from "./getMaterial";

export function initThree(textures) {
  const scene = initScene();

  initGeometry(scene, textures);

  return scene;
}

export function clearScene(scene) {
  const meshes = scene.children.filter(({ type }) => type === "Mesh");
  scene.remove.apply(scene, meshes);
}

function initScene() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(0, 0, 2);
  scene.add(light);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  function render(time) {
    const period = 500; // ms
    const lfo = (delay = 0) => Math.sin(time / period + delay);

    requestAnimationFrame(render);
    renderer.render(scene, camera);

    scene.children
      .filter(({ type }) => type === "Mesh" || type === "Group")
      .forEach((elem, i) => {
        elem.rotateY(0.01);
        elem.position.y = lfo(i * 0.5);
      });

    time *= 0.001;
  }
  render();

  return scene;
}

function initGeometry(scene, textureUrls) {
  const sphereGeometry = new THREE.SphereGeometry(0.5);
  const sphere = new THREE.Mesh(
    sphereGeometry,
    getMaterial(textureUrls["wood"])
  );
  sphere.position.x = -2;
  scene.add(sphere);

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(cubeGeometry, getMaterial(textureUrls["stone"]));
  scene.add(cube);

  const pyramidGeometry = new THREE.ConeGeometry(1, 1, 4);
  const pyramid = new THREE.Mesh(
    pyramidGeometry,
    getMaterial(textureUrls["brick"])
  );
  pyramid.position.x = 2;
  scene.add(pyramid);
}
