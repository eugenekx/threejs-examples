import * as THREE from "three";
import { getMaterial } from "./getMaterial";

function initGeometry(scene, textures) {
  const sphereGeometry = new THREE.SphereGeometry(0.5);
  const sphere = new THREE.Mesh(sphereGeometry, getMaterial(textures["wood"]));
  sphere.position.x = -2;
  scene.add(sphere);

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(cubeGeometry, getMaterial(textures["stone"]));
  scene.add(cube);

  const coneGeometry = new THREE.ConeGeometry(1, 1, 4);
  const cone = new THREE.Mesh(coneGeometry, getMaterial(textures["brick"]));
  cone.position.x = 2;
  scene.add(cone);
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
      .filter((elem) => elem.type === "Mesh" || elem.type === "Group")
      .forEach((elem, i) => {
        elem.rotateY(0.01);
        elem.position.y = lfo(i * 0.5);
      });

    time *= 0.001;
  }
  render();

  return scene;
}

export function initThree(textures) {
  const scene = initScene();

  initGeometry(scene, textures);
}
