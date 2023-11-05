<template>
  <div
    ref="root"
    class="container"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseleave="endDrag"
    @mouseup="endDrag"
  ></div>
</template>

<style>
.container {
  width: 100%;
  height: 200px;
  background-color: blue;
  cursor: grab;
}
</style>

<script setup>
import { ref } from "vue";

const root = ref(null);
let isDragging = false;
let initialY = 0;
let initialHeight = 0;

const minHeight = 50;
const maxHeight = 500;

function startDrag(e) {
  isDragging = true;
  initialY = e.clientY;
  initialHeight = root.value.clientHeight;
  root.value.style["background-color"] = "red";
  root.value.style.cursor = "grabbing";
}

function onDrag(e) {
  if (!isDragging) return;

  const deltaY = e.clientY - initialY;
  const newHeight = Math.min(
    maxHeight,
    Math.max(minHeight, initialHeight + deltaY)
  );

  root.value.style.height = newHeight + "px";
}

function endDrag() {
  isDragging = false;
  root.value.style["background-color"] = "blue";
  root.value.style.cursor = "grab";
}
</script>
