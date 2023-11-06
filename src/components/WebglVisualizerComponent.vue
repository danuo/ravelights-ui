<template>
  <div
    ref="root"
    id="container"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseleave="endDrag"
    @mouseup="endDrag"
  ></div>
</template>

<style>
#container {
  width: 100%;
  height: 200px;
  background-color: blue;
  cursor: grab;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import {
  DataTexture,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  Camera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
} from "three";

import { io } from "socket.io-client";
import { axiosGet } from "stores/app-store";

const root = ref(null);
let isDragging = false;
let initialY = 0;
let initialHeight = 0;

const minHeight = 50;
const maxHeight = 500;

onBeforeMount(() => {
  console.log("onBeforeMount");
  initThree();
});

onMounted(() => {
  console.log("onMounted");
  socket.connect();
});

onUnmounted(() => {
  console.log("onUnmounted");
  socket.disconnect();
});

function startDrag(e) {
  isDragging = true;
  // initialY = e.clientY;
  initialY = e.clientX;
  initialHeight = root.value.clientHeight;
  root.value.style["background-color"] = "red";
  root.value.style.cursor = "grabbing";
}

function onDrag(e) {
  if (!isDragging) return;

  // const deltaY = e.clientY - initialY;
  const deltaY = (e.clientX - initialY) * 0.5;
  const newHeight = Math.min(
    maxHeight,
    Math.max(minHeight, initialHeight + deltaY)
  );

  root.value.style.height = newHeight + "px";
  renderer.setSize(window.innerWidth, newHeight);
}

function endDrag() {
  isDragging = false;
  root.value.style["background-color"] = "blue";
  root.value.style.cursor = "grab";
}

// three

let scene, camera, renderer;
let NLEDS, NLIGHTS, SIZE, texture, data;
const socket = io("ws://127.0.0.1:5000", {
  autoConnect: false,
});

function initTexture(data, SIZE) {
  const texture = new DataTexture(data, 1, SIZE, RGBAFormat);
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
  const container = document.getElementById("container");
  renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, 200);
  container.appendChild(renderer.domElement);

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
    uvAttribute.setXY(2, 0, xEnd);
    uvAttribute.setXY(3, 1, xEnd);

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
  data.fill(128);

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
