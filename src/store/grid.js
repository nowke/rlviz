import { DEFAULT_GRIDS } from "@/grids";
import { GRIDS_LOCALSTORAGE_KEY } from "@/constants";

const gridStore = {
  namespaced: true,
  state: () => ({
    grids: {},
    selectedGridId: null
  }),
  mutations: {
    addGrid(state, grid) {
      state.grids[grid.id] = grid;
    },
    removeGrid(state, gridId) {
      delete state.grids[gridId];
    },
    updateGrid(state, grid) {
      state.grids[grid.id] = grid;
    },
    selectGrid(state, gridId) {
      state.selectedGridId = gridId;
    },
    setGrids(state, grids) {
      state.grids = grids;
    }
  },
  getters: {
    selectedGridId: state => state.selectedGridId,
    selectedGrid: state => state.grids[state.selectedGridId],
    grids: state => state.grids
  },
  actions: {
    initializeGridsFromStorage({ commit }) {
      if (localStorage.getItem(GRIDS_LOCALSTORAGE_KEY)) {
        const grids = JSON.parse(localStorage.getItem(GRIDS_LOCALSTORAGE_KEY));
        commit("setGrids", grids);

        if (grids.GRID_CLASSIC_4x3) {
          commit("selectGrid", grids.GRID_CLASSIC_4x3.id);
        } else {
          commit("selectGrid", grids[Object.keys(grids)[0]].id);
        }
      } else {
        commit("setGrids", DEFAULT_GRIDS);
        commit("selectGrid", DEFAULT_GRIDS.GRID_CLASSIC_4x3.id);
      }
    }
  }
};

export default gridStore;
