<template>
  <div class="q-pa-md row">
    <q-list bordered separator>
      <q-item v-for="gen in availableGenerators" :key="gen">
        <q-item-section>
          <q-item-label> {{ gen[0] }} </q-item-label>
          <q-item-label caption> {{ gen[1] }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'AvailableGenerators',
  setup() {
    return {
      availableGenerators: ref([]),
    };
  },
  mounted() {
    this.getAvailableGenerators();
  },
  methods: {
    getAvailableGenerators() {
      fetch('/api/available_generators')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.availableGenerators = response.available_generators;
          console.log(this.availableGenerators);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
