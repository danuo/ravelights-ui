<template>
  <div class="q-mt-md">
    <q-item-label caption style="color: #474747">
      Global Effect Enabled
    </q-item-label>
  </div>
  <div class="row justify-between">
    <q-btn-toggle
      v-model="settings.global_effects_enabled"
      @click="appStore.set_settings('global_effects_enabled')"
      style="height: 3em"
      :options="[
        { label: 'enabled', value: true },
        { label: 'disabled', value: false },
      ]"
    />
    <q-btn
      label="clear effect queue"
      @click="clear_effect_queue()"
      style="height: 3em"
      color="primary"
    />
  </div>
  <q-list bordered>
    <q-scroll-area style="height: 40vh">
      <q-list padding>
        <q-item v-for="item in effect" :key="item">
          <div class="row full-width">
            <div class="col-12">
              <q-markup-table
                flat
                dense
                style="background-color: rgba(86, 61, 124, 0.15)"
                separator="none"
              >
                <thead style="background-color: #1e1a20">
                  <tr>
                    <th colspan="2">
                      <div class="row no-wrap items-center">
                        <div class="text-h6 text-white">
                          {{ item.name.toUpperCase() }}
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">mode: {{ item.mode }}</td>
                    <td class="text-left">
                      limit_frames: {{ item.limit_frames }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      trigger:
                      {{ item.trigger }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-4 q-pr-xs">
                  <q-btn
                    @click="modify_effect('renew_trigger', item.name)"
                    label="trigger"
                    color="grey"
                    class="full-width"
                  />
                </div>
                <div class="col-4 q-pr-xs">
                  <q-btn
                    @click="modify_effect('alternate', item.name)"
                    label="altern."
                    color="grey"
                    class="full-width"
                  />
                </div>
                <div class="col-4">
                  <q-btn
                    @click="modify_effect('remove', item.name)"
                    label="remove"
                    color="grey"
                    class="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-list>
</template>

<script setup>
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, effect } = storeToRefs(appStore);

function modify_effect(operation, effect_name) {
  let body = {
    action: "modify_effect",
    operation: operation,
    effect_name: effect_name,
  };
  axiosPut("/rest/effect", body);

  if (operation == "remove") {
    effect.value = effect.value.filter((item) => item.name !== effect_name);
  }
}

function clear_effect_queue() {
  let body = { action: "clear_effect_queue" };
  axiosPut("/rest/settings", body);
}
</script>
