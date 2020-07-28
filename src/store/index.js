import Vue from "vue";
import Vuex from "vuex";

import algorithm from "./algorithm";
import grid from "./grid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: "value",
    cellSize: 80,
    gamma: 0.9,
    initialValue: 0.0,
    control: {
      iterations: 25,
      delay: 200
    }
  },
  mutations: {
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
    iterations(state, value) {
      state.control.iterations = value;
    },
    delay(state, value) {
      state.control.delay = value;
    }
  },
  getters: {
    mode: state => state.mode,
    cellSize: state => state.cellSize,
    gamma: state => state.gamma,
    initialValue: state => state.initialValue,
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
