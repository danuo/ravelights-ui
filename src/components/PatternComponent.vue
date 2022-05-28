<template>
  <div class="q-gutter-sm">
    <div class="row q-gutter-sm">
      <q-btn
        @click="setActivePattern(0)"
        class="col"
        label="Pattern 0"
        :color="getColor(0)"
        :text-color="getColor(0) == 'white' ? 'black' : 'white'"
        style="aspect-ratio: 4 / 1"
      />
      <q-btn
        @click="setActivePattern(1)"
        class="col"
        label="Pattern 1"
        :color="getColor(1)"
        :text-color="getColor(1) == 'white' ? 'black' : 'white'"
      />
      <q-btn
        @click="setActivePattern(2)"
        class="col"
        label="Pattern 2"
        :color="getColor(2)"
        :text-color="getColor(2) == 'white' ? 'black' : 'white'"
      />
    </div>
    <div class="row q-gutter-sm">
      <q-btn
        @click="setActivePattern(3)"
        class="col"
        label="Pattern 3"
        :color="getColor(3)"
        :text-color="getColor(3) == 'white' ? 'black' : 'white'"
        style="aspect-ratio: 4 / 1"
      />
      <q-btn
        @click="setActivePattern(4)"
        class="col"
        label="Pattern 4"
        :color="getColor(4)"
        :text-color="getColor(4) == 'white' ? 'black' : 'white'"
      />
      <q-btn
        @click="setActivePattern(5)"
        class="col"
        label="Pattern 5"
        :color="getColor(5)"
        :text-color="getColor(5) == 'white' ? 'black' : 'white'"
      />
    </div>
    <div class="row q-gutter-sm">
      <q-btn
        @click="setActivePattern(6)"
        class="col"
        label="Pattern 6"
        :color="getColor(6)"
        :text-color="getColor(6) == 'white' ? 'black' : 'white'"
        style="aspect-ratio: 4 / 1"
      />
      <q-btn
        @click="setActivePattern(7)"
        class="col"
        label="Pattern 7"
        :color="getColor(7)"
        :text-color="getColor(7) == 'white' ? 'black' : 'white'"
      />
      <q-btn
        @click="setActivePattern(8)"
        class="col"
        label="Pattern 8"
        :color="getColor(8)"
        :text-color="getColor(8) == 'white' ? 'black' : 'white'"
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
