<template>
  <div class="q-pa-md" v-if="apiResponse !== null">
    <q-chip
      outline
      v-for="idx in colors.length"
      :key="idx"
      :style="'color: ' + colors[idx]"
    >
      {{ 'color' + idx }}
    </q-chip>
  </div>
  <q-list bordered separator v-if="apiResponse !== null">
    <q-item v-for="(e, idx) in names.length" :key="idx">
      <q-item-section>
        <q-item-label caption>
          {{ names[idx] + descriptions[idx] }}
        </q-item-label>
        <div class="row">
          <div class="col-8">
            <div style="width: 100%; height: 100px" v-html="svgs[idx]" />
          </div>
          <div class="col-4">
            <div class="column">
              <div class="col">
                <q-btn
                  @click="setTimeline(idx, true)"
                  label="load full"
                  style="width: 100%; height: 50px"
                  :color="idx == selectedTimelineIndex ? 'white' : 'dark'"
                  :text-color="idx == selectedTimelineIndex ? 'black' : 'white'"
                />
              </div>
              <div class="col">
                <q-btn
                  @click="setTimeline(idx, false)"
                  label="load placements"
                  style="width: 100%; height: 50px"
                  color="black"
                />
              </div>
            </div>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'TimelineComponent',
  data() {
    return {
      apiResponse: null,
      names: null,
      descriptions: null,
      svgs: null,
      colors: null,
      selectedTimelineIndex: null,
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.apiResponse = response;
        this.names = response.meta.timelines.names;
        this.descriptions = response.meta.timelines.descriptions;
        this.svgs = response.meta.timelines.svgs;
        this.colors = response.meta.timelines.colors;
        this.selectedTimelineIndex = response.active_timeline_index;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    setTimeline(timeline_index, set_full) {
      this.selectedTimelineIndex = timeline_index;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_timeline',
          timeline_index: this.selectedTimelineIndex,
          set_full: set_full,
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
