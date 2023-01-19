<template>
  <q-list bordered separator v-if="apiResponse !== null">
    <q-item v-for="idx in names.length" :key="idx">
      <q-item-section>
        <q-item-label caption>
          {{ names[idx - 1] + descriptions[idx - 1] }}
        </q-item-label>
        <div class="row">
          <div class="col-8">
            <div style="width: 100%; height: 100px" v-html="svgs[idx - 1]" />
          </div>
          <div class="col-4">
            <div class="column">
              <div class="col">
                <q-btn
                  :label="names[idx - 1]"
                  style="width: 100%; height: 50px"
                  color="accent"
                />
              </div>
              <div class="col">
                <q-btn
                  :label="names[idx - 1]"
                  style="width: 100%; height: 50px"
                  color="primary"
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
