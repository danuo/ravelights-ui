<template>
  <div
    v-ripple
    class="container relative-position non-selectable flex justify-start"
    :class="{ active: active, fancy: fancy }"
  >
    <div
      class="icon-box row items-center q-pl-md"
      :class="{ 'q-pr-md': fancy }"
    >
      <q-icon size="sm" :name="icon" />
    </div>
    <div
      class="row items-center"
      :class="{ 'q-pl-md': fancy, 'q-pl-sm': !fancy }"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  label: String,
  icon: String,
  fancy: Boolean,
});
</script>

<style lang="scss" scoped>
$border-radius: 8px;
$border-width: 3px;

.icon-box {
  border-top-left-radius: $border-radius - $border-width;
  border-bottom-left-radius: $border-radius - $border-width;
}

.container.active.fancy .icon-box {
  background-color: $purple;
  transition: background-color 0.3s ease;
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
  transition: background-color 0.3s ease;
}

.container.active {
  color: white;
  border-color: $purple;
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
