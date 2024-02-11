<template>
  <div
    v-show="enable_visualizer"
    ref="canvas"
    id="canvas"
    @mousedown="startDrag"
    @touchstart.passive="startDrag"
    @mousemove="onDrag"
    @touchmove.passive="onDrag"
    @mouseleave="endDrag"
    @mouseup="endDrag"
    @touchend="endDrag"
  ></div>
</template>

<style>
#canvas {
  width: 100%;
  height: 200px;
  background-color: black;
  cursor: grab;
}
</style>

<script setup>
import { storeToRefs } from "pinia";
import { useAppStore } from "stores/app-store";
const appStore = useAppStore();
const { settings, enable_visualizer } = storeToRefs(appStore);

import { ref, onMounted, watchEffect } from "vue";
import {
  DataTexture,
  PlaneGeometry,
  RGBAFormat,
  SRGBColorSpace,
  Scene,
  Camera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
} from "three";

import { io } from "socket.io-client";

const canvas = ref(null);
let isDragging = false;
let initialY = 0;
let initialHeight = 0;

let scene, camera, renderer;
let HEIGHT;
let NLEDS, NLIGHTS, SIZE, texture, data;
const socket = io({ autoConnect: false });

HEIGHT = 200;
const minHeight = 50;
const maxHeight = 500;

onMounted(() => {
  initWebGl();
});

watchEffect(() => {
  if (enable_visualizer) {
    socket.connect();
  } else {
    socket.disconnect();
  }
});

function startDrag(e) {
  const clientX = e.clientX || e.changedTouches[0].clientX;
  isDragging = true;
  initialY = clientX;
  initialHeight = canvas.value.clientHeight;
  canvas.value.style.cursor = "grabbing";
}

function onDrag(e) {
  if (!isDragging) return;
  const clientX = e.clientX || e.changedTouches[0].clientX;

  const deltaY = (clientX - initialY) * 0.5;
  const newHeight = Math.min(
    maxHeight,
    Math.max(minHeight, initialHeight + deltaY)
  );

  HEIGHT = newHeight;
  canvas.value.style.height = HEIGHT + "px";
  renderer.setSize(window.innerWidth, HEIGHT);
}

function endDrag() {
  isDragging = false;
  canvas.value.style.cursor = "grab";
}

function initTexture(data, SIZE) {
  const texture = new DataTexture(data, 1, SIZE, RGBAFormat);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function linspace(start, end, num) {
  const step = (end - start) / (num - 1);
  const result = [];
  for (let i = 0; i < num; i++) {
    result.push(start + i * step);
  }
  return result;
}

function sum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

function initScene() {
  renderer = new WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, 200);
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
  canvas.value.appendChild(renderer.domElement);

  scene = new Scene();
  camera = new Camera();

  clearScene();
  buildScene();

  window.addEventListener("resize", onWindowResize);
  render();
}

function buildScene() {
  let spacings = [0];
  let pixelCounter = 0;
  for (let i = 0; i < NLIGHTS; i++) {
    pixelCounter += NLEDS[i];
    spacings.push(pixelCounter / SIZE);
  }

  const planeWidth = (1 / NLIGHTS) * 1.3;
  const planeHeight = 1.8;
  const spread = 1 - planeWidth / 2 - 0.07;
  const positions = linspace(-spread, spread, NLIGHTS);

  for (let i = 0; i < NLIGHTS; i++) {
    let planeGeometry = new PlaneGeometry(planeWidth, planeHeight, 1, 1);
    let uvAttribute = planeGeometry.getAttribute("uv");
    const xStart = spacings[i];
    const xEnd = spacings[i + 1];

    // flipped with vars
    uvAttribute.setXY(0, 0, xStart);
    uvAttribute.setXY(1, 1, xStart);
    uvAttribute.setXY(2, 0, xEnd - 1 / 10000);
    uvAttribute.setXY(3, 1, xEnd - 1 / 10000);

    // planeGeometry.uvsNeedUpdate = true;
    let material = new MeshBasicMaterial({ map: texture });
    let mesh = new Mesh(planeGeometry, material);

    mesh.position.x = positions[i];
    scene.add(mesh);
  }
}

function clearScene() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, HEIGHT);
}

function render() {
  renderer.render(scene, camera);
  console.log("BBB");
}

function deviceConfigToNLEDS(deviceConfig) {
  let n_lights = [];
  deviceConfig.forEach((element) => {
    for (let i = 0; i < element.n_lights; i++) {
      n_lights.push(element.n_leds);
    }
  });
  return n_lights;
}

async function readDeviceConfig() {
  // const apiData = await axiosGet("/rest/settings");
  // const deviceConfig = apiData.device_config;
  console.log(settings.value.device_config);

  NLEDS = deviceConfigToNLEDS(settings.value.device_config);
  NLIGHTS = NLEDS.length;
  SIZE = sum(NLEDS);
  console.log(NLIGHTS);
}

async function initWebGl() {
  await readDeviceConfig();

  data = new Uint8Array(4 * SIZE);
  texture = initTexture(data, SIZE);

  initScene(NLEDS, NLIGHTS, SIZE, texture);

  socket.on("message", (in_data) => {
    let array = new Uint8Array(in_data);
    data.set(array);
    texture.needsUpdate = true;
    render();
  });
}
</script>
