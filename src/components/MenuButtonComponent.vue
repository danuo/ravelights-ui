<template>
  <div
    v-ripple
    class="container relative-position non-selectable flex items-center justify-start q-pa-md"
    :class="{ active: active }"
    @click="callback"
  >
    <q-icon size="sm" :name="icon" />
    {{ label }}
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

<style lang="scss" scoped>
.container {
  gap: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 1.5s;
  height: 60px;
  width: 100%;
  font-weight: 400;
  border-style: solid;
  border-width: 3px;
  border-color: $border-grey;
  background-color: black;
}

.container.active {
  border-color: $purple;
}
</style>
