import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

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

const light = new THREE.PointLight(0xffffff, 2);
light.position.set(0, 0, 2);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate(time) {
  const period = 500; // ms
  const lfo = (delay = 0) => Math.sin(time / period + delay);

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  sphere.rotateY(0.01);
  sphere.position.y = lfo(-0.5);

  cube.rotateY(0.01);
  cube.position.y = lfo();

  cone.rotateY(0.01);
  cone.position.y = lfo(0.5);
}
animate();
