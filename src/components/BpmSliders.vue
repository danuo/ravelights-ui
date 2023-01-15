<template>
  <q-list bordered separator>
    <q-item v-for="slider in sliders" :key="slider.name">
      <!-- is slider -->
      <q-item-section v-if="slider.type == 'slider'">
        <q-item-label caption> {{ slider.var_name }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-12">
            <q-slider
              @change="handleClick(slider.var_name)"
              v-model="api_response[slider.var_name]"
              track-size="15px"
              thumb-size="30px"
              color="primary"
              selection-color="secondary"
              snap
              :markers="slider.markers"
              :min="slider.range_min"
              :max="slider.range_max"
              :step="slider.step"
              label-always
              :label-value="api_response[slider.var_name]"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'BpmSliders',
  data() {
    return {
      sliders: [],
      api_response: {},
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.sliders = response['controls_global_sliders'];
        console.log(this.sliders);
        this.api_response = response;
        console.log(this.api_response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleClick(var_name) {
      const requestBody = {
        action: 'change_settings',
      };
      requestBody[var_name] = this.api_response[var_name];
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
