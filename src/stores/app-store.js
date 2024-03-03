import { defineStore } from "pinia";
import axios from "axios";

const config = {
  timeout: 600, // time in ms
};

export const axiosPut = async (url, inData) => {
  try {
    const response = await axios.put(url, inData, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};

export const axios_get = async (url) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};

export const useAppStore = defineStore("app-store", {
  state: () => {
    return {
      settings: {},
      triggers: {},
      meta: {},
      devices: {},
      effect: {},
      is_initialized: false,
      enable_quick_select: true,
      enable_advanced_mode: false,
      enable_floating_menu: false,
      enable_visualizer: true,
      enable_fixed_device_target: true,
    };
  },
  actions: {
    async init_store_data() {
      let [settings, triggers, meta, devices, effect] = await Promise.all([
        axios_get("/rest/settings"),
        axios_get("/rest/triggers"),
        axios_get("/rest/meta"),
        axios_get("/rest/devices"),
        axios_get("/rest/effect"),
      ]);
      this.settings = settings;
      this.triggers = triggers;
      this.meta = meta;
      this.devices = devices;
      this.effect = effect;
      if (Object.keys(this.meta).length > 0) {
        this.is_initialized = true;
      }
    },
    async update_data(key) {
      switch (key) {
        case "settings":
          console.log("refresh settings");
          let settings = await axios_get("/rest/settings");
          this.settings = settings;
          break;
        case "triggers":
          console.log("refresh triggers");
          let triggers = await axios_get("/rest/triggers");
          this.triggers = triggers;
          break;
        case "meta":
          console.log("refresh meta");
          let meta = await axios_get("/rest/meta");
          this.meta = meta;
          break;
        case "devices":
          console.log("refresh devices");
          let devices = await axios_get("/rest/devices");
          this.devices = devices;
          break;
        case "effect":
          console.log("refresh effect");
          let effect = await axios_get("/rest/effect");
          this.effect = effect;
          break;
      }
    },
    async init_sse() {
      let eventSource = new EventSource("/sse");
      eventSource.onmessage = (event) => {
        console.info("feed event received");
        this.update_data(event.data);
      };
    },
    set_settings(var_name) {
      let body = { action: "set_settings" };
      body[var_name] = this.settings[var_name];
      axiosPut("/rest/settings", body);
    },
    set_settings_value(var_name, value) {
      let body = { action: "set_settings" };
      body[var_name] = value;
      axiosPut("/rest/settings", body);
    },
  },
  getters: {
    device_list_options(state) {
      let device_indices = [];
      for (let i = 0; i < state.devices.length; i++) {
        if (state.devices[i].linked_to === null) {
          device_indices.push(i);
        }
      }
      return device_indices;
    },
  },
});
