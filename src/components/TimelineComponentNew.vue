<template>
  <div class="q-pa-md" v-if="apiResponse !== null">
    <div class="row" v-for="idx in names.length" :key="idx">
      <div class="col-8">
        <div style="width: 100%; height: 100px" v-html="svgs[idx - 1]" />
      </div>
      <div class="col-4">
        <div class="column">
          <div class="col">
            <q-btn :label="names[idx - 1]" style="width: 100%; height: 50px" />
          </div>
          <div class="col">
            <q-btn :label="names[idx - 1]" style="width: 100%; height: 50px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineComponentNew',
  data() {
    return {
      apiResponse: null,
      names: null,
      descriptions: null,
      svgs: null,
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.apiResponse = response;
        this.names = response['meta']['timelines']['names'];
        this.descriptions = response['meta']['timelines']['descriptions'];
        this.svgs = response['meta']['timelines']['svgs'];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>
