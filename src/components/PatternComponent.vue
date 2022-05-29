<template>
  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="n in 16" :key="`xs-${n}`">
      <q-btn
        @click="setActivePattern(0)"
        class="col-3"
        label="Pattern 0"
        :color="getColor(0)"
        :text-color="getColor(0) == 'white' ? 'black' : 'white'"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'PatternComponent',
  setup() {
    return {
      activePattern: ref(null),
    };
  },
  mounted() {
    this.getActivePattern();
  },
  methods: {
    getColor(pattern: number) {
      if (this.activePattern == pattern) {
        return 'primary';
      }
      return 'white';
    },
    getActivePattern() {
      fetch('/api/pattern')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.activePattern = response.pattern;
          console.log(this.activePattern);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setActivePattern(pattern: number) {
      this.activePattern = pattern;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pattern: this.activePattern }),
      };

      fetch('/api/pattern', requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
