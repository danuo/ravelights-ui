<template>
  <div class="row q-col-gutter-xs" v-if="triggers !== null">
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
        @click="this.selected_type = typ[gen_type_idx]"
        :class="
          this.selected_type == typ[gen_type_idx] ? 'green-box' : 'grey-box'
        "
      >
        <q-item-label caption style="color: #474747">
          {{ typ[gen_type_idx] }}
        </q-item-label>
        <div v-for="timeline_level in 3" :key="timeline_level">
          <div class="row justify-between">
            <div
              v-for="it in this.repr_ui(
                this.get_trigger(typ[gen_type_idx], timeline_level)
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
        { label: '2', value: 3 },
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

<script>
import { ref } from "vue";
export default {
  name: "TriggerComponent",
  data() {
    return {
      selected_type: ref("pattern"),
      timeline_level: ref(0),
      triggers: ref(null),
      marker_arange_to_value: {
        0: 1,
        1: 2,
        2: 4,
        3: 8,
        4: 16,
        5: 32,
      },
      marker_value_to_arange: ref(null),
      quarters_letters: ref(["A", "B", "C", "D"]),
      typ: ref(["pattern", "pattern_sec", "vfilter", "dimmer", "thinner"]),
      global_manual_timeline_level: ref(0),
    };
  },
  mounted() {
    this.fetch_settings();
    this.marker_value_to_arange = this.invert_dict(this.marker_arange_to_value);
    this.$bus.on("global_manual_timeline_level", (value) => {
      this.global_manual_timeline_level = value;
    });
  },
  computed: {
    beats_array: {
      get() {
        if (this.triggers !== null) {
          return this.triggers[this.selected_type][this.timeline_level]
            .beats_array;
        } else {
          return [true];
        }
      },
      set(value) {
        this.triggers[this.selected_type][this.timeline_level].beats_array =
          value;
      },
    },
    quarters_array: {
      get() {
        if (this.triggers !== null) {
          return this.triggers[this.selected_type][this.timeline_level]
            .quarters_array;
        } else {
          return [true];
        }
      },
      set(value) {
        this.triggers[this.selected_type][this.timeline_level].quarters_array =
          value;
      },
    },
    loop_length_selection: {
      get() {
        if (this.triggers !== null) {
          let loop_length =
            this.triggers[this.selected_type][this.timeline_level].loop_length;
          return this.marker_value_to_arange[loop_length];
        } else {
          return 8;
        }
      },
      set(loop_length_sel) {
        let loop_length_value = this.marker_arange_to_value[loop_length_sel];
        this.triggers[this.selected_type][this.timeline_level].loop_length =
          loop_length_value;
      },
    },
    p: {
      get() {
        if (this.triggers !== null) {
          return this.triggers[this.selected_type][this.timeline_level].p;
        } else {
          return 1.0;
        }
      },
      set(value) {
        this.triggers[this.selected_type][this.timeline_level].p = value;
      },
    },
    loop_length() {
      if (this.marker_arange_to_value !== null) {
        return this.marker_arange_to_value[this.loop_length_selection];
      } else {
        return 0;
      }
    },
    beats_list() {
      return this.get_beats_list(this.beats_array, this.loop_length);
    },
    quarters_str() {
      return this.get_quarters_str(this.quarters_array, this.loop_length);
    },
    repr() {
      return [
        this.beats_list,
        this.quarters_str,
        this.marker_arange_to_value[this.loop_length_selection],
        this.p,
      ];
    },
    out_dict() {
      return {
        beats_array: this.beats_array,
        quarters_array: this.quarters_array,
        loop_length: this.loop_length,
        p: this.p,
        selected_type: this.selected_type,
        timeline_level: this.timeline_level,
      };
    },
  },
  methods: {
    delayed_execute(func) {
      let timer = setTimeout(() => {
        func();
      }, 100);
    },
    fetch_settings() {
      fetch("/rest/settings")
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.triggers = response.triggers;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    get_beats_list(beats_array, loop_length) {
      let result = [];
      for (let i = 0; i < loop_length; i++) {
        if (beats_array[i]) {
          result.push(i);
        }
      }
      return result;
    },
    get_quarters_str(quarters_array, loop_length) {
      let string = "";
      for (let i = 0; i < 4; i++) {
        if (quarters_array[i]) {
          string += this.quarters_letters[i];
        }
      }
      return string;
    },
    repr_ui(trigger) {
      return [
        this.get_beats_list(trigger.beats_array, trigger.loop_length),
        this.get_quarters_str(trigger.quarters_array, trigger.loop_length),
        trigger.loop_length,
        trigger.p,
      ];
    },
    get_trigger(a, b) {
      return this.triggers[a][b];
    },
    invert_dict(dict) {
      if (dict !== null) {
        let inverted = Object.keys(dict).reduce((obj, key) => {
          obj[dict[key]] = key;
          return obj;
        }, {});
        return inverted;
      } else {
        return null;
      }
    },
    set_trigger() {
      let requestBody = {
        ...this.triggers[this.selected_type][this.timeline_level],
        action: "set_trigger",
        gen_type: this.selected_type,
        timeline_level: this.timeline_level,
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      this.delayed_execute(this.fetch_settings);
    },
    send_command(command) {
      const data = {
        action: "gen_command",
        command: command,
        gen_type: this.selected_type,
        timeline_level: this.timeline_level,
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
