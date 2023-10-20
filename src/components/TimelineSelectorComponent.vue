<template>
  <h6 class="text-weight-regular text-center q-ma-xs">Active Timeline</h6>

  <q-list bordered separator v-if="Object.keys(appStore.settings).length > 0">
    <q-item>
      <q-item-section>
        <div class="row">
          <div class="col-8">
            <q-item-label caption>
              {{
                meta.available_timelines_svg.names[
                  settings.active_timeline_index
                ] +
                " | " +
                meta.available_timelines_svg.descriptions[
                  settings.active_timeline_index
                ]
              }}
            </q-item-label>
            <div
              style="width: 100%; height: 100px"
              v-html="
                meta.available_timelines_svg.svgs[
                  settings.active_timeline_index
                ]
              "
            />
          </div>
          <div class="col-4">
            <div class="column flex-center" style="height: 100%">
              <div
                class="col"
                v-for="idx in meta.available_timelines_svg.colors.length"
                :key="idx"
              >
                <q-chip
                  outline
                  :style="
                    'color: ' + meta.available_timelines_svg.colors[idx - 1]
                  "
                >
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

  <q-list bordered separator v-if="Object.keys(appStore.settings).length > 0">
    <q-item
      v-for="(e, idx) in meta.available_timelines_svg.names.length"
      :key="idx"
    >
      <q-item-section>
        <q-item-label caption>
          {{
            meta.available_timelines_svg.names[idx] +
            " | " +
            meta.available_timelines_svg.descriptions[idx]
          }}
        </q-item-label>
        <div class="row">
          <div class="col-8">
            <div
              style="width: 100%; height: 100px"
              v-html="meta.available_timelines_svg.svgs[idx]"
            />
          </div>
          <div class="col-4">
            <div class="column">
              <div class="col">
                <q-btn
                  @click="set_timeline(idx, true)"
                  label="load full"
                  style="width: 100%; height: 50px"
                  :color="
                    idx == settings.active_timeline_index ? 'white' : 'dark'
                  "
                  :text-color="
                    idx == settings.active_timeline_index ? 'black' : 'white'
                  "
                />
              </div>
              <div class="col">
                <q-btn
                  @click="set_timeline(idx, false)"
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

<script setup>
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, meta } = storeToRefs(appStore);

function set_timeline(timeline_index, set_full) {
  settings.value.active_timeline_index = timeline_index;
  let body = {
    action: "set_timeline",
    timeline_index: appStore.settings.active_timeline_index,
    set_full: set_full,
  };
  axiosPut("/rest/settings", body);
}
</script>
