const algorithmStore = {
  namespaced: true,
  state: () => ({
    name: {
      value: "value_iter",
      text: "Value Iteration"
    },
    running: false, // whether algorithm is being run
    currentIter: 0, // Iteration that is currently running
    currentRunTotalIters: 0, // Total iterations user asked
    iterSoFar: 0, // Total iterations that's been executed ever
    valueHistory: []
  }),
  mutations: {
    name(state, value) {
      state.name = value;
    },
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
    name: state => state.name,
    running: state => state.running,
    itersSoFar: state => state.iterSoFar,
    currentIter: state => state.currentIter,
    currentRunTotalIters: state => state.currentRunTotalIters,
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
    },
    runIterationsMode() {},
    callMethod() {}
  }
};

export default algorithmStore;
