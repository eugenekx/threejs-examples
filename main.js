import * as THREE from "three";

class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
  }
  pick(normalizedPosition, scene, camera, time) {
    // restore the color if there is a picked object
    if (this.pickedObject) {
      this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
      this.pickedObject = undefined;
    }

    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      this.pickedObject = intersectedObjects[0].object;
      // save its color
      this.pickedObjectSavedColor =
        this.pickedObject.material.emissive.getHex();
      // set its emissive color to flashing red/yellow
      this.pickedObject.material.emissive.setHex(
        (time * 8) % 2 > 1 ? 0xffff00 : 0xff0000
      );
    }
  }
}

const pickPosition = { x: 0, y: 0 };
clearPickPosition();

function getCanvasRelativePosition(event) {
  const canvas = document.querySelector("canvas");
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) * canvas.width) / rect.width,
    y: ((event.clientY - rect.top) * canvas.height) / rect.height,
  };
}

function setPickPosition(event) {
  const canvas = document.querySelector("canvas");
  const pos = getCanvasRelativePosition(event);
  pickPosition.x = (pos.x / canvas.width) * 2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1; // note we flip Y
}

function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}

window.addEventListener("mousemove", setPickPosition);
window.addEventListener("mouseout", clearPickPosition);
window.addEventListener("mouseleave", clearPickPosition);

window.addEventListener(
  "touchstart",
  (event) => {
    // prevent the window from scrolling
    event.preventDefault();
    setPickPosition(event.touches[0]);
  },
  { passive: false }
);

window.addEventListener("touchmove", (event) => {
  setPickPosition(event.touches[0]);
});

window.addEventListener("touchend", clearPickPosition);

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

const pickHelper = new PickHelper();

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

  time *= 0.001;

  pickHelper.pick(pickPosition, scene, camera, time);
}
animate();
