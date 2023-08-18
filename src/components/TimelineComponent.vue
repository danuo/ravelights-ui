<template>
  <h6 class="text-weight-regular text-center q-ma-xs">Active Timeline</h6>

  <q-list bordered separator v-if="names !== null">
    <q-item>
      <q-item-section>
        <div class="row">
          <div class="col-8">
            <q-item-label caption>
              {{
                names[active_timeline_index] +
                " | " +
                descriptions[active_timeline_index]
              }}
            </q-item-label>
            <div
              style="width: 100%; height: 100px"
              v-html="svgs[active_timeline_index]"
            />
          </div>
          <div class="col-4">
            <div class="column flex-center" style="height: 100%">
              <div class="col" v-for="idx in colors.length" :key="idx">
                <q-chip outline :style="'color: ' + colors[idx - 1]">
                  {{ "level " + idx }}
                </q-chip>
              </div>
            </div>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>

  <h6 class="text-weight-regular text-center q-ma-xs">Load Timeline</h6>

  <q-list bordered separator v-if="names !== null">
    <q-item v-for="(e, idx) in names.length" :key="idx">
      <q-item-section>
        <q-item-label caption>
          {{ names[idx] + " | " + descriptions[idx] }}
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
                  :color="idx == active_timeline_index ? 'white' : 'dark'"
                  :text-color="idx == active_timeline_index ? 'black' : 'white'"
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
import { ref } from "vue";

export default {
  name: "TimelineComponent",
  setup() {
    return {
      names: ref(null),
      descriptions: ref(null),
      svgs: ref(null),
      colors: ref(null),
      active_timeline_index: ref(null),
    };
  },
  mounted() {
    fetch("/rest/settings")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.names = response.meta.timelines.names;
        this.descriptions = response.meta.timelines.descriptions;
        this.svgs = response.meta.timelines.svgs;
        this.colors = response.meta.timelines.colors;
        this.active_timeline_index = response.active_timeline_index;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    setTimeline(timeline_index, set_full) {
      this.active_timeline_index = timeline_index;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_timeline",
          timeline_index: this.active_timeline_index,
          set_full: set_full,
        }),
      };
      fetch("/rest/settings", requestOptions)
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
