const algorithmStore = {
  namespaced: true,
  state: () => ({
    running: false, // whether algorithm is being run
    currentIter: 0, // Iteration that is currently running
    currentRunTotalIters: 0, // Total iterations user asked
    iterSoFar: 0, // Total iterations that's been executed ever
    valueHistory: []
  }),
  mutations: {
    setAlgorithmRunning(state, value) {
      state.running = value;
    },
    setAlgorithmCurrentTotal(state, value) {
      state.currentRunTotalIters = value;
    },
    setAlgorithmCurrentIter(state, value) {
      state.currentIter = value;
    },
    setAlgorithmIterSoFar(state, value) {
      state.iterSoFar = value;
    },
    addToValueHistory(state, value) {
      state.valueHistory.push(value);
    },
    clearValueHistory(state) {
      state.valueHistory = [];
    }
  },
  getters: {
    running: state => state.running,
    itersSoFar: state => state.iterSoFar,
    valueHistory: state => state.valueHistory
  },
  actions: {
    runIterations: ({ commit }, payload) => {
      commit("setAlgorithmRunning", true);
      commit("setAlgorithmCurrentTotal", payload);
    },
    incrementIteration: ({ commit, state }) => {
      commit("setAlgorithmCurrentIter", state.currentIter + 1);
      commit("setAlgorithmIterSoFar", state.iterSoFar + 1);
    },
    finishIteration({ commit }) {
      commit("setAlgorithmCurrentIter", 0);
      commit("setAlgorithmRunning", false);
      commit("setAlgorithmCurrentTotal", 0);
    },
    reset({ commit }) {
      commit("setAlgorithmCurrentIter", 0);
      commit("setAlgorithmRunning", false);
      commit("setAlgorithmCurrentTotal", 0);
      commit("setAlgorithmIterSoFar", 0);
      commit("clearValueHistory");
    },
    cancelRun({ commit }) {
      commit("setAlgorithmRunning", false);
    }
  }
};

export default algorithmStore;
