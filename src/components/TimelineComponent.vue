<template>
  <h5 class="text-center q-ma-md">Timeline Selector</h5>
  <div class="q-mb-lg">
    <q-option-group
      @click="setTimeline"
      v-model="selectedTimelineIndex"
      :options="timelineOptions"
      type="radio"
      inline
      dense
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'TimelineComponent',
  setup() {
    return {
      selectedTimelineIndex: ref(0),
      availableTimelines: ref([]),
      timelineOptions: ref([]),
    };
  },
  mounted() {
    this.getAvailableTimelines();
  },
  methods: {
    getAvailableTimelines() {
      fetch('/api/timelines')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log('Logging timeline response...');
          console.log(response);
          this.availableTimelines = response.available_timelines;
          this.selectedTimelineIndex = response.active_timeline_index;
          this.timelineOptions = [];
          for (const [index, name] of this.availableTimelines.entries()) {
            this.timelineOptions.push({
              label: name,
              value: index,
            });
          }
          console.log(this.availableTimelines);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setTimeline() {
      console.log('Setting timeline...');
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeline_index: this.selectedTimelineIndex,
        }),
      };
      fetch('/api/timelines', requestOptions)
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
