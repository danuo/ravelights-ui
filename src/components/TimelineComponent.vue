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
  <button class="primary" @click="setTimeline()">apply timeline</button>
</template>

<script lang="ts">
import { ref } from 'vue';
type TimelineOption = {
  label: string;
  value: number;
};
export default {
  name: 'TimelineComponent',
  setup() {
    return {
      selectedTimelineIndex: ref(0),
      availableTimelines: ref([]),
      timelineOptions: ref<TimelineOption[]>([]),
    };
  },
  mounted() {
    this.getAvailableTimelines();
  },
  methods: {
    getAvailableTimelines() {
      console.log('loading timeline...');
      fetch('/api')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log('Logging timeline response...');
          console.log(response);
          this.selectedTimelineIndex = response.active_timeline_index;
          this.availableTimelines = response.meta_available_timelines;
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
          action: 'set_timeline',
          timeline_index: this.selectedTimelineIndex,
        }),
      };
      fetch('/api', requestOptions)
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
