import * as THREE from "three";

export function getMaterial(textureUrl) {
  const albedoTexture = new THREE.TextureLoader().load(textureUrl.urlAlbedo);
  const normalTexture = new THREE.TextureLoader().load(textureUrl.urlNormal);

  return new THREE.MeshPhongMaterial({
    map: albedoTexture,
    normalMap: normalTexture,
  });
}
