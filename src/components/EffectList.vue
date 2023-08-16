<template>
  <div class="q-mt-xs q-mb-sm row reverse">
    <q-btn
      label="clear effect queue"
      @click="clearEffectQueue()"
      style="height: 3em"
      color="primary"
    />
  </div>

  <q-list bordered separator v-if="this.effect_list.length > 0">
    <q-item v-for="item in this.effect_list" :key="item">
      <q-item-section>
        <div class="row">
          <div class="col-12">
            <q-item-label overline>{{ item.name }}</q-item-label>
            <q-markup-table flat dense square style="background-color: black">
              <tbody>
                <tr>
                  <td class="text-left">mode: {{ item.mode }}</td>
                  <td class="text-left">
                    limit_frames: {{ item.limit_frames }}
                  </td>
                  <td class="text-left">loop_length: {{ item.loop_length }}</td>
                </tr>
              </tbody>
              trigger: {{ item.trigger }}
            </q-markup-table>
          </div>
          <div class="col-12">
            <div class="q-gutter-xs">
              <q-btn
                @click="modify_effect('renew_trigger', item.name)"
                label="trigger"
                color="grey"
              />
              <q-btn
                @click="modify_effect('alternate', item.name)"
                label="altern."
                color="grey"
              />
              <q-btn
                @click="modify_effect('remove', item.name)"
                label="remove"
                color="grey"
              />
            </div>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      effect_list: ref([]),
      timer: "",
    };
  },
  mounted() {
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
  },
};
</script>
