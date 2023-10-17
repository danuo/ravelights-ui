<template>
  <div
    class="row q-col-gutter-xs"
    v-if="Object.keys(appStore.triggers).length > 0"
  >
    <div v-for="idx in 2" :key="idx" class="col-6">
      <div class="grey-box">
        <div class="row justify-between">
          <div
            v-for="string in ['beats', 'quarters', 'length', 'p']"
            :key="string"
          >
            {{ string }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(e, gen_type_idx) in typ.length"
      :key="gen_type_idx"
      class="col-6"
    >
      <div
        @click="selected_type = typ[gen_type_idx]"
        :class="selected_type == typ[gen_type_idx] ? 'green-box' : 'grey-box'"
      >
        <q-item-label caption style="color: #474747">
          {{ typ[gen_type_idx] }}
        </q-item-label>
        <div v-for="timeline_level in 3" :key="timeline_level">
          <div class="row justify-between">
            <div
              v-for="it in repr_ui(
                get_trigger(typ[gen_type_idx], timeline_level)
              )"
              :key="it"
            >
              {{ it }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-space />
  </div>

  <div class="q-my-sm row justify-between">
    <q-btn-toggle
      v-model="timeline_level"
      toggle-color="primary"
      :options="[
        { label: 'a', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
      ]"
      size="lg"
    />

    <q-btn-group>
      <q-btn
        label="renew_T"
        icon="update"
        @click="send_command('renew_trigger')"
      />
      <q-btn
        label="on_t"
        icon="visibility"
        @click="send_command('on_trigger')"
      />
    </q-btn-group>
  </div>

  <!-- slider p -->
  <div class="q-px-md q-by-md" v-if="triggers !== null">
    <q-list>
      <div class="q-px-md q-py-md">
        <q-item-label caption> p </q-item-label>
        <q-slider
          @change="set_trigger()"
          v-model="p"
          color="primary"
          selection-color="secondary"
          track-size="15px"
          thumb-size="30px"
          snap
          :min="0"
          :max="1"
          :step="0.1"
          :marker-labels="[0, 0.25, 0.5, 0.75, 1]"
        />
      </div>
      <div class="q-px-md q-py-md">
        <!-- slider loop length -->
        <q-item-label caption> loop_length </q-item-label>
        <q-slider
          @change="set_trigger()"
          v-model="loop_length_selection"
          color="primary"
          selection-color="secondary"
          track-size="15px"
          thumb-size="30px"
          :min="0"
          :max="Object.keys(marker_arange_to_value).length - 2"
          :marker-labels="marker_arange_to_value"
          snap
        />
      </div>
    </q-list>
  </div>

  <!-- beat selector -->
  <div class="row q-col-gutter-xs q-py-xl" v-if="triggers !== null">
    <div class="col-3" v-for="(e, idx) in 4" :key="idx">
      <q-btn
        @click="
          quarters_array[idx] = !quarters_array[idx];
          set_trigger();
        "
        :label="quarters_letters[idx]"
        class="col"
        :color="quarters_array[idx] ? 'secondary' : 'primary'"
        style="width: 100%; height: 100px"
      />
    </div>
  </div>
  <div class="row q-col-gutter-xs" v-if="triggers !== null">
    <div class="col-3" v-for="(e, idx) in 16" :key="idx">
      <q-btn
        @click="
          beats_array[idx] = !beats_array[idx];
          set_trigger();
        "
        :label="idx"
        style="width: 100%; height: 100px"
        class="q-pa-sm"
        :square="true"
        :color="idx < loop_length && beats_array[idx] ? 'secondary' : 'primary'"
        :text-color="beats_array[idx] ? 'black' : 'white'"
        :disable="idx < loop_length ? false : true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, triggers } = storeToRefs(appStore);

const selected_type = ref("pattern");
const timeline_level = ref(0);
const marker_arange_to_value = {
  0: 1,
  1: 2,
  2: 4,
  3: 8,
  4: 16,
  5: 32,
};
const marker_value_to_arange = invert_dict(marker_arange_to_value);
const quarters_letters = ["A", "B", "C", "D"];
const typ = ["pattern", "pattern_sec", "vfilter", "dimmer", "thinner"];

const beats_array = computed({
  get() {
    if (appStore.triggers !== null) {
      return triggers.value[selected_type.value][timeline_level.value]
        .beats_array;
    } else {
      return [true];
    }
  },
  set(value) {
    triggers.value[selected_type.value][timeline_level.value].beats_array =
      value;
  },
});

const quarters_array = computed({
  get() {
    if (triggers !== null) {
      return triggers.value[selected_type.value][timeline_level.value]
        .quarters_array;
    } else {
      return [true];
    }
  },
  set(value) {
    triggers.value[selected_type.value][timeline_level.value].quarters_array =
      value;
  },
});

const loop_length_selection = computed({
  get() {
    if (triggers !== null) {
      let loop_length =
        triggers.value[selected_type.value][timeline_level.value].loop_length;
      return marker_value_to_arange[loop_length];
    } else {
      return 8;
    }
  },
  set(loop_length_sel) {
    let loop_length_value = marker_arange_to_value[loop_length_sel];
    triggers.value[selected_type.value][timeline_level.value].loop_length =
      loop_length_value;
  },
});

const p = computed({
  get() {
    if (triggers !== null) {
      return triggers.value[selected_type.value][timeline_level.value].p;
    } else {
      return 1.0;
    }
  },
  set(value) {
    triggers.value[selected_type.value][timeline_level.value].p = value;
  },
});

const loop_length = computed(
  () => marker_arange_to_value[loop_length_selection]
);

const beats_list = computed(() => get_beats_list(beats_array, loop_length));

const quarters_str = computed(() =>
  this.get_quarters_str(this.quarters_array, this.loop_length)
);

const repr = computed(() => [
  beats_list,
  quarters_str,
  marker_arange_to_value[loop_length_selection],
  p,
]);

const out_dict = computed(() => {
  return {
    beats_array: beats_array,
    quarters_array: quarters_array,
    loop_length: loop_length,
    p: p,
    selected_type: selected_type.value,
    timeline_level: timeline_level.value,
  };
});

function get_beats_list(beats_array, loop_length) {
  let result = [];
  for (let i = 0; i < loop_length; i++) {
    if (beats_array[i]) {
      result.push(i);
    }
  }
  return result;
}

function get_quarters_str(quarters_array, loop_length) {
  let string = "";
  for (let i = 0; i < 4; i++) {
    if (quarters_array[i]) {
      string += quarters_letters[i];
    }
  }
  return string;
}

function repr_ui(trigger) {
  return [
    get_beats_list(trigger.beats_array, trigger.loop_length),
    get_quarters_str(trigger.quarters_array, trigger.loop_length),
    trigger.loop_length,
    trigger.p,
  ];
}

function get_trigger(a, b) {
  console.log("here");
  console.log(triggers.value);
  console.log(a);
  console.log(b);
  let test = triggers.value[a][b];
  console.log(test);
  return test;
}

function invert_dict(dict) {
  if (dict !== null) {
    let inverted = Object.keys(dict).reduce((obj, key) => {
      obj[dict[key]] = key;
      return obj;
    }, {});
    return inverted;
  } else {
    return null;
  }
}

function set_trigger() {
  let body = {
    ...triggers.value[selected_type.value][timeline_level.value],
    action: "set_trigger",
    gen_type: selected_type.value,
    timeline_level: timeline_level.value,
  };
  axiosPut("/rest/settings", body);
}

function send_command(command) {
  const body = {
    action: "gen_command",
    command: command,
    gen_type: selected_type.value,
    timeline_level: timeline_level.value,
  };
  axiosPut("/rest/settings", body);
}
</script>
