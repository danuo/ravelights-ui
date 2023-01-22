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

  <div class="q-ma-md row q-col-gutter-xs" v-if="triggers !== null">
    <div class="col-12" v-for="(e, idx) in typ.length" :key="idx">
      <div class="my-content" style="background-color: #111">
        <!-- {{ triggers }} -->
        {{ triggers[typ[idx]][selected_level] }}
        {{ selected_level }}
      </div>
    </div>
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
      {{ beats_array }}
      {{ quarters_array }}
      {{ p }}
      {{ loop_length }}
    </div>
    <div>
      {{ repr }}
    </div>
    <div>
      {{ out_dict }}
    </div>
  </q-card>

  <!-- slider 1 -->
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

  <!-- slider 2 -->
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

  <!-- beat selector -->
  <div class="row q-col-gutter-xs" v-if="selectedGenerators !== null">
    <div class="col-3" v-for="(e, idx) in loop_length" :key="idx">
      <q-btn
        @click="beat_array[idx] = !beat_array[idx]"
        :label="idx"
        style="width: 100%; height: 100px"
        class="q-pa-sm"
        :square="true"
        :color="beat_array[idx] ? 'secondary' : 'primary'"
        :text-color="beat_array[idx] ? 'black' : 'white'"
      />
    </div>
  </div>
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
      typ: ['pattern', 'dimmer', 'thinner', 'effect'],
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
        this.beats_array = trigger.beats_array;
        this.quarters_array = trigger.quarters_array;
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
      if (this.marker_arange_to_label !== null) {
        return this.marker_arange_to_label[this.loop_length_selection];
      } else {
        return 0;
      }
    },
    beats_list() {
      let result = [];
      for (let i = 0; i < this.loop_length; i++) {
        if (this.beats_array[i]) {
          result.push(i);
        }
      }
      return result;
    },
    quarters_list() {
      let result = [];
      for (let i = 0; i < this.loop_length; i++) {
        if (this.quarters_array[i]) {
          result.push(this.quarters_str[i]);
        }
      }
      return result;
    },
    repr() {
      return [
        this.beats_list,
        this.quarters_list,
        this.marker_arange_to_label[this.loop_length_selection],
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
  },
};
</script>
