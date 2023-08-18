<template>
  <div class="q-mt-xs row justify-between">
    <q-btn-toggle
      v-model="global_effects_enabled"
      @click="set_settings('global_effects_enabled')"
      style="height: 3em"
      :options="[
        { label: 'enabled', value: true },
        { label: 'disabled', value: false },
      ]"
    />
    <q-btn
      label="clear effect queue"
      @click="clearEffectQueue()"
      style="height: 3em"
      color="primary"
    />
  </div>
  <q-list bordered v-if="this.effect_list.length > 0">
    <q-scroll-area style="height: 40vh">
      <q-list padding>
        <q-item v-for="item in this.effect_list" :key="item">
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
                    <td>draw_mode: {{ item.draw_mode }}</td>
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
                <div class="col-3 q-pr-xs">
                  <q-btn
                    @click="modify_effect('change_draw', item.name)"
                    label="draw"
                    color="grey"
                    class="full-width full-height"
                  />
                </div>
                <div class="col-3 q-pr-xs">
                  <q-btn
                    @click="modify_effect('renew_trigger', item.name)"
                    label="trigger"
                    color="grey"
                    class="full-width"
                  />
                </div>
                <div class="col-3 q-pr-xs">
                  <q-btn
                    @click="modify_effect('alternate', item.name)"
                    label="altern."
                    color="grey"
                    class="full-width"
                  />
                </div>
                <div class="col-3">
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

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      effect_list: ref([]),
      timer: "",
      global_effects_enabled: ref(true),
    };
  },
  mounted() {
    fetch("/rest/settings")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.global_effects_enabled = response.global_effects_enabled;
      })
      .catch((err) => {
        console.log(err);
      });
    this.refresh_effect_list();
    this.$bus.on("refresh_effect_list", () => {
      this.delayed_execute(this.refresh_effect_list);
    });
  },
  activated() {
    console.log("activated");
    this.refresh_effect_list();
    this.startAutoUpdate();
  },
  deactivated() {
    console.log("deactivated");
    this.stopAutoUpdate();
  },
  methods: {
    refresh_effect_list() {
      fetch("/rest/effect")
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.effect_list = response;
        })
        .catch((err) => {
          this.stopAutoUpdate();
          console.log(err);
        });
    },
    modify_effect(operation, effect_name) {
      const requestBody = {
        action: "modify_effect",
        operation: operation,
        effect_name: effect_name,
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest/effect", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      if (operation == "remove") {
        this.effect_list = this.effect_list.filter(
          (item) => item.name !== effect_name
        );
      }
    },
    delayed_execute(func) {
      let timer = setTimeout(() => {
        func();
      }, 100);
    },
    startAutoUpdate() {
      this.timer = setInterval(this.refresh_effect_list, 2000);
    },
    stopAutoUpdate() {
      clearInterval(this.timer);
    },
    beforeUnmount() {
      this.stopAutoUpdate();
    },
    clearEffectQueue() {
      let requestBody = {
        action: "clear_effect_queue",
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    set_settings(var_name) {
      let requestBody = {
        action: "set_settings",
      };
      requestBody[var_name] = this[var_name];
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
