import { GRIDS } from "@/grids";

const gridStore = {
  namespaced: true,
  state: () => ({
    currentGridIndex: 0,
    defaultGridChoices: GRIDS,
    grids: []
  }),
  mutations: {
    setCurrentGridIndex(state, value) {
      state.currentGridIndex = value;
    },
    initializeGridsFromStorage(state) {
      if (localStorage.getItem("grids")) {
        const grids = JSON.parse(localStorage.getItem("grids"));
        state.grids = grids;
      } else {
        state.grids = [];
      }
    },
    addGrid(state, grid) {
      state.grids.push(grid);
    },
    removeGrid(state, index) {
      state.grids.splice(index, 1);
    }
  },
  getters: {
    defaultGridChoices: state => state.defaultGridChoices,
    currentGridIndex: state => state.currentGridIndex,
    currentGrid: state => state.defaultGridChoices[state.currentGridIndex],
    grids: state => state.grids
  }
};

export default gridStore;
