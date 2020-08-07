export class IterativeAlgorithm {
  constructor(grid, gamma, initial_value = 0.0, living_reward = 0.0) {
    this.grid = grid;
    this.gamma = gamma;
    this.initial_value = initial_value;
    this.living_reward = living_reward;
    this._initializeState();
  }

  value(state) {
    if (!state) {
      return 0.0;
    }
    return this.states[state].value;
  }

  setValue(state, value) {
    this.states[state].value = value;
  }

  getValue(state) {
    return this.states[state].value;
  }

  reset() {
    this._initializeState();
  }

  resetInitial(initial_value) {
    this.initial_value = initial_value;
    this.reset();
  }

  _initializeState() {
    this.states = {};
  }

  _getStateValue(transitions) {
    return transitions
      .map(
        ([prob, nextState, reward]) =>
          prob * (reward + this.gamma * this.value(nextState))
      )
      .reduce((x, y) => x + y, 0.0);
  }
}
