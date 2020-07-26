import { GRIDS } from "@/grids";

const gridStore = {
  namespaced: true,
  state: () => ({
    currentGridIndex: 0,
    defaultGridChoices: GRIDS
  }),
  mutations: {
    setCurrentGridIndex(state, value) {
      state.currentGridIndex = value;
    }
  },
  getters: {
    defaultGridChoices: state => state.defaultGridChoices,
    currentGridIndex: state => state.currentGridIndex,
    currentGrid: state => state.defaultGridChoices[state.currentGridIndex]
  }
};

export default gridStore;
