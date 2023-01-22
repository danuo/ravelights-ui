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
      <div class="grey-box">
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

  <div class="q-ma-md row q-col-gutter-xs" v-if="triggers !== null">
    <div class="col-12" v-for="(e, idx) in typ.length" :key="idx">
      <div class="my-content" style="background-color: #111">
        <!-- {{ triggers }} -->
        {{ triggers[typ[idx]][selected_level] }}
        {{ selected_level }}
      </div>
    </div>
  </div>
  {{ triggers }}

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
      :label="quarters_letters[idx]"
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
      quarters_letters: ['A', 'B', 'C', 'D'],
      typ: ['pattern', 'vfilter', 'dimmer', 'thinner', 'pattern_sec', 'effect'],
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
      return this.get_beats_list(this.beats_array, this.loop_length);
    },
    quarters_str() {
      return this.get_quarters_str(this.quarters_array, this.loop_length);
    },
    repr() {
      return [
        this.beats_list,
        this.quarters_str,
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
  },
};
</script>
