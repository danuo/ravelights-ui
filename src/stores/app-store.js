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

export const axiosGet = async (url) => {
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
      effect_target_level: 0,
      advanced_mode: false,
      selected_device_index: 0,
      enable_floating_menu: false,
      enable_visualizer: true,
    };
  },
  actions: {
    async initAllData() {
      let [settings, triggers, meta, devices, effect] = await Promise.all([
        axiosGet("/rest/settings"),
        axiosGet("/rest/triggers"),
        axiosGet("/rest/meta"),
        axiosGet("/rest/devices"),
        axiosGet("/rest/effect"),
      ]);
      this.settings = settings;
      this.triggers = triggers;
      this.meta = meta;
      this.devices = devices;
      this.effect = effect;
    },
    async updateData(key) {
      switch (key) {
        case "settings":
          console.log("refresh settings");
          let settings = await axiosGet("/rest/settings");
          this.settings = settings;
          break;
        case "triggers":
          console.log("refresh triggers");
          let triggers = await axiosGet("/rest/triggers");
          this.triggers = triggers;
          break;
        case "meta":
          console.log("refresh meta");
          let meta = await axiosGet("/rest/meta");
          this.meta = meta;
          break;
        case "devices":
          console.log("refresh devices");
          let devices = await axiosGet("/rest/devices");
          this.devices = devices;
          break;
        case "effect":
          console.log("refresh effect");
          let effect = await axiosGet("/rest/effect");
          this.effect = effect;
          break;
      }
    },
    async initSSE() {
      let eventSource = new EventSource("/sse");
      eventSource.onmessage = (event) => {
        console.info("feed event received");
        this.updateData(event.data);
      };
    },
  },
});
