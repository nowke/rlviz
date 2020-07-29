import Vue from "vue";
import Vuex from "vuex";

import algorithm from "./algorithm";
import grid from "./grid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: "home",
    mode: "value",
    cellSize: 80,
    gamma: 0.9,
    initialValue: 0.0,
    noise: 0.2,
    control: {
      iterations: 25,
      delay: 200
    }
  },
  mutations: {
    page(state, page) {
      state.page = page;
    },
    mode(state, value) {
      state.mode = value;
    },
    cellSize(state, value) {
      state.cellSize = value;
    },
    gamma(state, value) {
      state.gamma = value;
    },
    initialValue(state, value) {
      state.initialValue = value;
    },
    noise(state, value) {
      state.noise = value;
    },
    iterations(state, value) {
      state.control.iterations = value;
    },
    delay(state, value) {
      state.control.delay = value;
    }
  },
  getters: {
    page: state => state.page,
    mode: state => state.mode,
    cellSize: state => state.cellSize,
    gamma: state => state.gamma,
    initialValue: state => state.initialValue,
    noise: state => state.noise,
    iterations: state => state.control.iterations,
    delay: state => state.control.delay
  },
  actions: {
    changeGrid({ commit, dispatch }, index) {
      commit("grid/setCurrentGridIndex", index);
      dispatch("algorithm/reset");
    },
    changeAlgorithm({ commit, dispatch }, algorithm) {
      commit("algorithm/name", algorithm);
      dispatch("algorithm/reset");
    }
  },
  modules: {
    algorithm,
    grid
  }
});
