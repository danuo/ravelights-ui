<template>
  <!-- <div ref="vis_control" id="vis_control">
    <div class="vis_button" @click="decrease"></div>
    <div class="vis_button" @click="increase"></div>
  </div> -->

  <div
    v-show="props.visualizerEnabled"
    ref="canvas"
    id="canvas"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @mousemove="onDrag"
    @touchmove="onDrag"
    @mouseleave="endDrag"
    @mouseup="endDrag"
    @touchend="endDrag"
  ></div>
</template>

<style>
/* .vis_button {
  width: 50%;
  height: 200px;
  cursor: pointer;
} */
#vis_control {
  width: 100%;
  height: auto;
  position: fixed;
  z-index: 20;
  display: flex;
}
#canvas {
  width: 100%;
  height: 200px;
  background-color: black;
  cursor: grab;
}
</style>

<script setup>
const props = defineProps(["visualizerEnabled"]);
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
import { axiosGet } from "stores/app-store";

// const vis_control = ref(null);
const canvas = ref(null);
let isDragging = false;
let initialY = 0;
let initialHeight = 0;

let scene, camera, renderer;
let NLEDS, NLIGHTS, SIZE, texture, data;
const socket = io({ autoConnect: false });

const minHeight = 50;
const maxHeight = 500;

onMounted(() => {
  initThree();
});

watchEffect(() => {
  if (props.visualizerEnabled) {
    socket.connect();
  } else {
    socket.disconnect();
  }
});

// function increase() {
//   const initialHeight = canvas.value.clientHeight;
//   const deltaY = 50;
//   const newHeight = Math.min(
//     maxHeight,
//     Math.max(minHeight, initialHeight + deltaY)
//   );
//   // vis_control.value.style.height = newHeight + "px";
//   canvas.value.style.height = newHeight + "px";
//   spacer.value.style.height = newHeight + "px";
//   renderer.setSize(window.innerWidth, newHeight);
// }

// function decrease() {
//   const initialHeight = canvas.value.clientHeight;
//   const deltaY = -50;
//   const newHeight = Math.min(
//     maxHeight,
//     Math.max(minHeight, initialHeight + deltaY)
//   );
//   // vis_control.value.style.height = newHeight + "px";
//   canvas.value.style.height = newHeight + "px";
//   spacer.value.style.height = newHeight + "px";
//   renderer.setSize(window.innerWidth, newHeight);
// }

function startDrag(e) {
  const clientX = e.clientX || e.changedTouches[0].clientX;
  isDragging = true;
  initialY = clientX;
  initialHeight = canvas.value.clientHeight;
  // canvas.value.style["background-color"] = "red";
  canvas.value.style.cursor = "grabbing";
}

function onDrag(e) {
  if (!isDragging) return;
  const clientX = e.clientX || e.changedTouches[0].clientX;

  // const deltaY = e.clientY - initialY;
  const deltaY = (clientX - initialY) * 0.5;
  const newHeight = Math.min(
    maxHeight,
    Math.max(minHeight, initialHeight + deltaY)
  );

  // vis_control.value.style.height = newHeight + "px";
  canvas.value.style.height = newHeight + "px";
  renderer.setSize(window.innerWidth, newHeight);
}

function endDrag() {
  isDragging = false;
  // canvas.value.style["background-color"] = "blue";
  canvas.value.style.cursor = "grab";
}

// three

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

function initWebGL() {
  renderer = new WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, 200);
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
  canvas.value.appendChild(renderer.domElement);

  scene = new Scene();
  camera = new Camera();

  // Create two PlaneGeometries
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

  window.addEventListener("resize", onWindowResize);
  render();
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, 200);
}

function render() {
  renderer.render(scene, camera);
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

async function initThree() {
  const apiData = await axiosGet("/rest/settings");
  const deviceConfig = apiData.device_config;
  NLEDS = deviceConfigToNLEDS(deviceConfig);

  NLIGHTS = NLEDS.length;
  SIZE = sum(NLEDS);

  data = new Uint8Array(4 * SIZE);

  texture = initTexture(data, SIZE);
  initWebGL(NLEDS, NLIGHTS, SIZE, texture);

  socket.on("message", (in_data) => {
    let array = new Uint8Array(in_data);
    data.set(array);
    texture.needsUpdate = true;
    render();
  });
}
</script>
