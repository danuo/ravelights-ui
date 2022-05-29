<template>
  <div class="q-pa-md row" v-if="active_generators !== null">
    <div class="col-3" v-for="gen_type in 4" :key="gen_type">
      <q-list bordered separator>
        <q-item v-for="gen_index in 3" :key="gen_index">
          <q-item-section>
            <q-item-label caption>
              {{ ['pattern', 'vfilter', 'thinner', 'dimmer'][gen_type - 1] }}
              {{ gen_index }}
            </q-item-label>
            <q-item-label>
              {{ activeGenerators[gen_type - 1][gen_index - 1] }}
            </q-item-label>
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
      activeGenerators: ref(null),
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
