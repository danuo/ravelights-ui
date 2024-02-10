<template>
  <q-dialog v-model="showPopup" persistent>
    <div>
      <q-banner class="text-white bg-red">
        <template v-slot:avatar>
          <q-icon name="sync_problem" size="xl" color="black" />
        </template>
        <div class="text-h6">API Version Mismatch.</div>
        <div>
          Backend Version: <strong>{{ serverVer }}</strong>
        </div>
        <div>
          Frontend Version: <strong>{{ uiVer }}</strong>
        </div>
        <template v-slot:action>
          <q-btn flat color="white" label="Dismiss" v-close-popup />
        </template>
      </q-banner>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  serverVer: String,
  uiVer: String,
});

const showPopup = ref(true);
</script>
