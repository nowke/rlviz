class ValueIteration {
  constructor(grid, gamma, initial_value = 0.0) {
    this.grid = grid;
    this.gamma = gamma;
    this.states = Object.fromEntries(
      grid.states.map(state => [this._s(state), { value: initial_value }])
    );
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

  run(iterations) {
    for (let i = 1; i <= iterations; i++) {
      for (const state of this.grid.states) {
        const values = [];
        for (const action of this.grid.actions) {
          const transitions = this.grid.getTransitions(state, action);
          if (!transitions.length) continue;

          const value = transitions
            .map(
              ([prob, nextState, reward]) =>
                prob * (reward + this.gamma * this.value(nextState))
            )
            .reduce((x, y) => x + y, 0.0);
          values.push(value);
        }
        this.setValue(state, Math.max(...values));
      }
    }
  }

  _s(state) {
    return `${state[0]},${state[1]}`;
  }
}

export default ValueIteration;
