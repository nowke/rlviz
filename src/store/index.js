import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: "value",
    cellSize: 80
  },
  mutations: {
    setMode(state, mode) {
      state.mode = mode;
    },
    setCellSize(state, value) {
      state.cellSize = value;
    }
  },
  getters: {
    mode: state => state.mode,
    cellSize: state => state.cellSize
  },
  actions: {},
  modules: {}
});
