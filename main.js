import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

const texture = new THREE.TextureLoader().load("textures/cube-texture.jfif");
const material = new THREE.MeshPhongMaterial({ map: texture });

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

const coneGeometry = new THREE.ConeGeometry(1, 1, 4);
const cone = new THREE.Mesh(coneGeometry, material);
cone.position.x = 2;
scene.add(cone);

const sphereGeometry = new THREE.SphereGeometry(0.5);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -2;
scene.add(sphere);

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

  cube.rotateY(0.01);
  cube.position.y = lfo();

  cone.rotateY(0.01);
  cone.position.y = lfo(0.5);

  sphere.rotateY(0.01);
  sphere.position.y = lfo(-0.5);
}
animate();
