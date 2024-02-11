<template>
  <div
    v-ripple
    class="container relative-position non-selectable flex justify-start"
    :class="{ active: active }"
    @click="callback"
  >
    <div class="icon-box row items-center q-px-md">
      <q-icon size="sm" :name="icon" />
    </div>
    <div class="row items-center q-pl-md">{{ label }}</div>
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
$border-radius: 8px;
$border-width: 3px;

.icon-box {
  object-fit: cover;
  border-top-left-radius: $border-radius - $border-width;
  border-bottom-left-radius: $border-radius - $border-width;
}

.container.active .icon-box {
  background-color: $purple;
}
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
}

.container.active {
  color: white;
  border-color: $purple;
}
</style>
