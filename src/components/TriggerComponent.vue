<!-- welche gen brauchen überhaupt trigger?
* pattern * 3
- vfilter
* dimmer * 3
* thinner * 3
* pattern sec * 3
* effects -> hat keine level

-->

<template>
  <h5 class="text-center q-ma-md">triggers</h5>
  <div class="q-pa-md q-gutter-sm" v-if="triggers !== null">
    <q-btn
      v-for="(e, idx) in triggers['pattern'].length"
      :key="idx"
      label="test"
    />
  </div>

  <!-- length selection -->
  <q-card
    color="grey-3"
    text-color="black"
    class="q-mb-sm"
    v-if="triggers !== null"
  >
    <!-- {{ objMarkerLabel[length_selection] }} -->
    <!-- {{ out_dict }} -->
    <div>
      {{ temp_trigger }}
    </div>
    <div>
      {{ quarters_array }}
      {{ loop_length }}
    </div>
    <div>
      {{ out_dict }}
    </div>
  </q-card>

  <div class="q-pa-xl q-gutter-sm" v-if="triggers !== null">
    <q-slider
      v-model="loop_length_selection"
      color="primary"
      selection-color="secondary"
      track-size="15px"
      thumb-size="30px"
      :min="0"
      :max="Object.keys(marker_arange_to_label).length - 2"
      :marker-labels="marker_arange_to_label"
      snap
      label-always
      label-value="trigger loop length"
    />
  </div>
  <div class="q-pa-xl q-gutter-sm" v-if="triggers !== null">
    <q-slider
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

  <!-- quarter toggle -->

  <q-btn-group class="row" style="width: 100%" v-if="triggers !== null">
    <q-btn
      v-for="(e, idx) in 4"
      :key="idx"
      @click="quarters_array[idx] = !quarters_array[idx]"
      :label="quarters_str[idx]"
      class="col"
      :color="quarters_array[idx] ? 'white' : 'black'"
    />
  </q-btn-group>
</template>

<script>
export default {
  name: 'TriggerComponent',
  data() {
    return {
      temp_trigger: null,
      selected_type: 'pattern',
      selected_level: 1,
      triggers: null,
      beat_array: Array(32).fill(false),
      quarters_array: Array(4).fill(false),
      loop_length_selection: 0,
      p: 0,
      marker_arange_to_label: null,
      marker_label_to_arange: null,
      quarters_str: ['A', 'B', 'C', 'D'],
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.triggers = response.triggers;
        let trigger = this.triggers[this.selected_type][this.selected_level];
        this.temp_trigger = trigger;
        this.marker_arange_to_label = response.meta.steps_dict;
        this.marker_label_to_arange = this.invert_dict(
          this.marker_arange_to_label
        );
        this.beat_array = this.beat_list_to_array(trigger.trigger_on_beats);
        this.quarters_array = this.quarter_list_to_array(
          trigger.trigger_on_quarters
        );
        this.loop_length_selection =
          this.marker_label_to_arange[trigger.loop_length];
        this.p = trigger.p;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    loop_length() {
      return this.marker_arange_to_label[this.loop_length_selection];
    },
    out_dict() {
      let out = {};
      out['beat_list'] = this.beat_array_to_list(
        this.beat_array,
        this.loop_length
      );
      out['quarter_str'] = this.quarter_array_to_list(
        this.quarters_array,
        this.loop_length
      );
      out['loop_length'] =
        this.marker_arange_to_label[this.loop_length_selection];
      out['p'] = this.p;
      return out;
    },
  },
  methods: {
    beat_array_to_list(beat_array, length) {
      let result = [];
      for (let i = 0; i < length; i++) {
        if (beat_array[i]) {
          result.push(i);
        }
      }
      return result;
    },
    quarter_array_to_list(q_array, length) {
      let result = [];
      for (let i = 0; i < length; i++) {
        if (q_array[i]) {
          result.push(this.quarters_str[i]);
        }
      }
      return result;
    },
    beat_list_to_array(beat_list) {
      let array = Array(32).fill(false);
      for (let num of beat_list) {
        array[num] = true;
      }
      return array;
    },
    quarter_list_to_array(q_list) {
      let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let array = Array(32).fill(false);
      for (let letter of q_list) {
        array[alphabet.indexOf(letter)] = true;
      }
      return array;
    },
    invert_dict(dict) {
      let inverted = Object.keys(dict).reduce((obj, key) => {
        obj[dict[key]] = key;
        return obj;
      }, {});
      return inverted;
    },
  },
};
</script>
