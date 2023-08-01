<template>
  <q-list bordered separator v-if="this.effect_list.length > 0">
    <q-item v-for="item in this.effect_list" :key="item">
      <q-item-section>
        <div class="row">
          <div class="col-8">
            <q-item-label overline>{{ item.name }}</q-item-label>
            <q-markup-table flat dense square style="background-color: black">
              <tbody>
                <tr>
                  <td class="text-left">{{ item.mode }}</td>
                  <td class="text-left">{{ item.limit_frames }}</td>
                  <td class="text-left">{{ item.loop_length }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
          <div class="col-4">
            <q-btn
              @click="remove_effect(item.name)"
              label="remove"
              color="grey"
              style="width: 100%; height: 100%"
            />
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
  created() {
    this.refresh_effect_list();
    this.timer = setInterval(this.refresh_effect_list, 1000);
  },
  mounted() {
    this.refresh_effect_list();
    this.$bus.on("refresh_effect_list", () => {
      this.delayed_execute(this.refresh_effect_list);
    });
  },
  methods: {
    refresh_effect_list() {
      fetch("/rest/effect")
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log("refresh");
          console.log(response);
          this.effect_list = response;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    remove_effect(effect_name) {
      const requestBody = {
        action: "remove_effect",
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
      this.effect_list = this.effect_list.filter(
        (item) => item.name !== effect_name
      );
    },
    delayed_execute(func) {
      let timer = setTimeout(() => {
        func();
      }, 100);
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    beforeUnmount() {
      this.cancelAutoUpdate();
    },
  },
};
</script>
