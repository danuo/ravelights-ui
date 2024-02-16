<template>
  <div
    v-ripple
    class="container relative-position non-selectable flex"
    :class="{ active: active }"
    @click="callback"
  >
    <div class="row items-center justify-start q-pa-md">{{ label }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  callback: Function,
  label: String,
});
</script>

<style lang="scss" scoped>
$border-radius: 8px;
$border-width: 3px;

.container {
  border-radius: 8px;
  cursor: pointer;
  transition: background 1.5s;
  height: 60px;
  width: 100%;
  font-weight: 400;
  border: $border-width solid $grey-10;
  color: $grey-7;
  background-color: black;
  transition: background-color 0.3s ease;
}
.container.active {
  color: white;
  border-color: $purple;
  background-color: $primary;
  transition: background-color 0.3s ease;
}
.container.active:hover {
  color: white;
  border-color: $purple-hover;
}
.container:hover {
  color: white;
  border-color: $grey-8;
}
</style>
