export class IterativeAlgorithm {
  constructor(grid, gamma, initial_value = 0.0) {
    this.grid = grid;
    this.gamma = gamma;
    this.initial_value = initial_value;
    this._initializeState();
  }

  value(state) {
    if (!state) {
      return 0;
    }
    return this.states[this._s(state)].value;
  }

  setValue(state, value) {
    this.states[this._s(state)].value = value;
  }

  getValue(state) {
    return this.states[this._s(state)].value;
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

  _s(state) {
    return `${state[0]},${state[1]}`;
  }
}
