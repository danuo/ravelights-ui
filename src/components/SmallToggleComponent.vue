<template>
  <div
    v-ripple
    class="container relative-position non-selectable column justify-center items-start q-px-sm"
    :class="{ active: active }"
    @click="callback"
  >
    <div class="col-auto text-purple-light">
      {{ label }}
    </div>
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
$border-radius: 6px;
$border-width: 2px;

.text-purple-light {
  color: $grey-9;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 0.75rem;
  letter-spacing: 0.03333em;
  // line-break: anywhere;
}
div.active > :deep(.text-purple-light) {
  color: $grey-4;
}

.col-auto.text-h6 {
  margin-top: -7px;
  margin-bottom: -2px;
}

.container {
  border-radius: $border-radius;
  cursor: pointer;
  transition: background 1.5s;
  height: 40px;
  width: 100%;
  border: $border-width solid $grey-10;
  color: $grey-7;
  background-color: black;
  transition: background-color 0.3s ease;
}
.container.active {
  color: white;
  border-color: $primary;
  background-color: black;
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
