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

  minValue() {
    return Math.min(...this._values());
  }

  maxValue() {
    return Math.max(...this._values());
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

  _values() {
    const values = Object.keys(this.states).map(
      state => this.states[state].value
    );
    return [...values, 0.0];
  }
}
