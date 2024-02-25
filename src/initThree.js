import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { PickHelper } from "./PickHelper";

function initMaterials() {
  const albedoWoodTexture = new THREE.TextureLoader().load(
    "textures/wooden-planks/albedo.png"
  );
  const normalWoodTexture = new THREE.TextureLoader().load(
    "textures/wooden-planks/normal.png"
  );

  const materialWood = new THREE.MeshPhongMaterial({
    map: albedoWoodTexture,
    normalMap: normalWoodTexture,
  });

  const albedoBrickTexture = new THREE.TextureLoader().load(
    "textures/brick-wall/albedo.png"
  );
  const normalBrickTexture = new THREE.TextureLoader().load(
    "textures/brick-wall/normal.png"
  );

  const materialBrick = new THREE.MeshPhongMaterial({
    map: albedoBrickTexture,
    normalMap: normalBrickTexture,
  });

  const albedoStoneTexture = new THREE.TextureLoader().load(
    "textures/mossy-stone/albedo.png"
  );
  const normalStoneTexture = new THREE.TextureLoader().load(
    "textures/mossy-stone/normal.png"
  );
  const materialStone = new THREE.MeshPhongMaterial({
    map: albedoStoneTexture,
    normalMap: normalStoneTexture,
  });

  return { materialBrick, materialStone, materialWood };
}

function initGeometry({ materialBrick, materialStone, materialWood, scene }) {
  const sphereGeometry = new THREE.SphereGeometry(0.5);
  const sphere = new THREE.Mesh(sphereGeometry, materialStone);
  sphere.position.x = -2;
  scene.add(sphere);

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(cubeGeometry, materialBrick);
  scene.add(cube);

  const coneGeometry = new THREE.ConeGeometry(1, 1, 4);
  const cone = new THREE.Mesh(coneGeometry, materialWood);
  cone.position.x = 2;
  scene.add(cone);

  return { sphere, cube, cone };
}

function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(0, 0, 2);
  scene.add(light);

  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return { scene, camera, light, renderer };
}

function loadModel(scene, model) {
  const loader = new GLTFLoader();

  loader.load(
    "models/model.glb",
    function (gltf) {
      gltf.scene.position.y = 2;
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

export function initThree() {
  const pickHelper = new PickHelper();

  const { scene, camera, light, renderer } = initScene();
  const { materialBrick, materialStone, materialWood } = initMaterials();
  const { sphere, cube, cone } = initGeometry({
    materialBrick,
    materialStone,
    materialWood,
    scene,
  });

  let model;
  loadModel(scene, model);

  console.log(model);

  function render(time) {
    const period = 500; // ms
    const lfo = (delay = 0) => Math.sin(time / period + delay);

    requestAnimationFrame(render);
    renderer.render(scene, camera);

    if (model) {
      model.rotateY(0.01);
    }

    scene.children
      .filter((elem) => elem.type === "Mesh" || elem.type === "Group")
      .forEach((elem, i) => {
        elem.rotateY(0.01);
        elem.position.y = lfo(i * 0.5);
      });

    time *= 0.001;

    pickHelper.pick(scene, camera, time);
  }

  render();
}
