<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="enable_floating_menu" seamless position="bottom">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <div class="col-4">
            <q-btn
              style="width: 100%; height: 80px"
              class="q-pa-sm"
              :square="true"
              label="tes"
              color="primary"
            />
          </div>
          <div class="col-4">
            <q-btn
              style="width: 100%; height: 80px"
              class="q-pa-sm"
              :square="true"
              label="tes"
              color="primary"
            />
          </div>
          <div class="col-4">
            <q-btn
              style="width: 100%; height: 80px"
              class="q-pa-sm"
              :square="true"
              label="tes"
              color="primary"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { enable_floating_menu } = storeToRefs(appStore);

function toggleVisualizer() {
  enable_visualizer.value = !enable_visualizer.value;
}
</script>
