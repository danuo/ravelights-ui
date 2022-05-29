<template>
  <div class="q-pa-md row">
    <div class="col-3" v-for="k in 4" :key="MediaKeySession">
      <q-list bordered separator>
        <q-item v-for="i in 3" :key="i">
          <q-item-section>
            <q-item-label caption>Pattern {{ i }}</q-item-label>
            <q-item-label>{{ activeGenerators[k][i] }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'ActiveGenerators',
  setup() {
    return {
      activeGenerators: ref([[]]),
    };
  },
  mounted() {
    this.getActiveGenerators();
  },
  methods: {
    getActiveGenerators() {
      fetch('/api/active_generators')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.activeGenerators = response.active_generators;
          console.log(this.activeGenerators);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
