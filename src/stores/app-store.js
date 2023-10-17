import { defineStore } from "pinia";
import axios from "axios";

const config = {
  timeout: 300, // time in ms
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

const axiosGet = async (url) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};

const getData = async () => {
  let [settings, meta] = await Promise.all([
    axiosGet("/rest/settings"),
    axiosGet("/rest/meta"),
  ]);
  return [settings, meta];
};

export const useAppStore = defineStore("app-store", {
  state: () => {
    return {
      settings: {},
      meta: {},
    };
  },
  actions: {
    async refreshData() {
      let [settings, meta] = await getData();
      this.settings = settings;
      this.meta = meta;
    },
  },
});
