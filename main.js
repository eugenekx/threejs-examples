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
const material = new THREE.MeshBasicMaterial({ map: texture });

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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotateY(0.01);

  cone.rotateY(0.01);

  sphere.rotateY(0.01);
}
animate();
