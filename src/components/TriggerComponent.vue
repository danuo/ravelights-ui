<!-- welche gen brauchen überhaupt trigger?
* pattern * 3
- vfilter
* dimmer * 3
* thinner * 3
* pattern sec * 3
* effects -> hat keine level

-->

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
        <div v-for="level_index in 3" :key="level_index">
          <div class="row justify-between">
            <div
              v-for="it in this.repr_ui(
                this.get_trigger(typ[gen_type_idx], level_index)
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

  <div class="q-my-lg" v-if="triggers !== null">
    <q-btn-toggle
      v-model="selected_level"
      toggle-color="primary"
      :options="[
        { label: 'Primary', value: 1 },
        { label: 'Seconday', value: 2 },
        { label: 'Tertiary', value: 3 },
      ]"
    />
  </div>

  <!-- slider p -->
  <div class="q-pa-xl q-gutter-sm" v-if="triggers !== null">
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
      label-always
      :label-value="p"
    />
  </div>

  <!-- slider loop length -->
  <div class="q-pa-xl q-gutter-sm" v-if="triggers !== null">
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
      label-always
      label-value="trigger loop length"
    />
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
export default {
  name: 'TriggerComponent',
  data() {
    return {
      selected_type: 'pattern',
      selected_level: 1,
      triggers: null,
      marker_arange_to_value: null,
      marker_value_to_arange: null,
      quarters_letters: ['A', 'B', 'C', 'D'],
      typ: ['pattern', 'vfilter', 'dimmer', 'thinner', 'pattern_sec', 'effect'],
      typ_options: null,
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.triggers = response.triggers;
        this.marker_arange_to_value = response.meta.steps_dict;
        this.marker_value_to_arange = this.invert_dict(
          this.marker_arange_to_value
        );
      })
      .catch((err) => {
        console.log(err);
      });
    this.typ_options = this.typ.map((x) => {
      return { label: x, value: x };
    });
  },
  computed: {
    beats_array: {
      get() {
        if (this.triggers !== null) {
          return this.triggers[this.selected_type][this.selected_level]
            .beats_array;
        } else {
          return [true];
        }
      },
      set(value) {
        this.triggers[this.selected_type][this.selected_level].beats_array =
          value;
      },
    },
    quarters_array: {
      get() {
        if (this.triggers !== null) {
          return this.triggers[this.selected_type][this.selected_level]
            .quarters_array;
        } else {
          return [true];
        }
      },
      set(value) {
        this.triggers[this.selected_type][this.selected_level].quarters_array =
          value;
      },
    },
    loop_length_selection: {
      get() {
        if (this.triggers !== null) {
          let loop_length =
            this.triggers[this.selected_type][this.selected_level].loop_length;
          return this.marker_value_to_arange[loop_length];
        } else {
          return 8;
        }
      },
      set(loop_length_sel) {
        let loop_length_value = this.marker_arange_to_value[loop_length_sel];
        this.triggers[this.selected_type][this.selected_level].loop_length =
          loop_length_value;
      },
    },
    p: {
      get() {
        if (this.triggers !== null) {
          return this.triggers[this.selected_type][this.selected_level].p;
        } else {
          return 1.0;
        }
      },
      set(value) {
        this.triggers[this.selected_type][this.selected_level].p = value;
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
        selected_level: this.selected_level,
      };
    },
  },
  methods: {
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
      let string = '';
      for (let i = 0; i < loop_length; i++) {
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
        ...this.triggers[this.selected_type][this.selected_level],
        action: 'set_trigger',
        gen_type: this.selected_type,
        level_index: this.selected_level,
      };
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
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
