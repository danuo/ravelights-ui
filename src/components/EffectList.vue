<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-slide-item
        v-for="item in this.effect_list"
        :key="item"
        @left="onLeft"
        @right="onRight"
        left-color="red"
        right-color="red"
      >
        <template v-slot:left>
          <div class="row items-center">Remove Effect</div>
        </template>
        <template v-slot:right>
          <div class="row items-center">Remove Effect</div>
        </template>

        <q-item>
          <q-item-section>Effect Name</q-item-section>
        </q-item>
      </q-slide-item>
    </q-list>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";

export default {
  data() {
    return {
      effect_list: [1, 2, 3],
    };
  },
  setup() {
    const $q = useQuasar();
    let timer;

    function finalize(reset) {
      timer = setTimeout(() => {
        reset();
      }, 1000);
    }

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      onLeft({ reset }) {
        $q.notify("Left action triggered. Resetting in 1 second.");
        finalize(reset);
      },

      onRight({ reset }) {
        $q.notify("Right action triggered. Resetting in 1 second.");
        finalize(reset);
      },
    };
  },
};
</script>
