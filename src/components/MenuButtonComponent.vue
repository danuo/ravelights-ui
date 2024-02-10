<template>
  <div
    v-ripple
    class="relative-position container flex flex-center non-selectable"
    :class="{ active: active }"
    @click="callback"
  >
    <q-icon size="sm" name="font_download" />
    {{ label }}
    <q-radio v-model="fake_model" val="teal" color="teal" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const fake_model = ref(false);
const props = defineProps({
  active: Boolean,
  callback: Function,
  label: String,
  icon: String,
});

fake_model.value = props.active;
console.log(fake_model.value);
console.log(props.active);
</script>

<style lang="css" scoped>
.container {
  border-radius: 8px;
  cursor: pointer;
  transition: background 1.5s;
  height: 60px;
  width: 100%;
  font-weight: 400;
  border-style: solid;
  border-width: 3px;
  border-color: rgb(31, 41, 55);
  background-color: black;
}

.container.active {
  border-color: rgb(109, 40, 217);
}
</style>
