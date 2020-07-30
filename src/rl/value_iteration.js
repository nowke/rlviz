import { IterativeAlgorithm } from "./algorithm";

class ValueIteration extends IterativeAlgorithm {
  constructor(grid, gamma, initial_value = 0.0) {
    super(grid, gamma, initial_value);
    this.value_diff = 0;
  }

  policy(state) {
    if (this.grid.isTerminal(state)) {
      return null;
    }

    let maxValue = Number.NEGATIVE_INFINITY;
    let maxAction = null;
    for (const action of this.grid.actions) {
      const transitions = this.grid.getTransitions(state, action);
      const value = this._getStateValue(transitions);
      if (value > maxValue) {
        maxAction = action;
        maxValue = value;
      }
    }
    return maxAction;
  }

  run(iterations) {
    for (let i = 1; i <= iterations; i++) {
      // Calculate new state values
      const stateValues = [];
      for (const state of Object.keys(this.grid.states)) {
        const values = [];
        for (const action of this.grid.actions) {
          const transitions = this.grid.getTransitions(state, action);
          if (!transitions.length) continue;
          values.push(this._getStateValue(transitions));
        }
        stateValues.push([state, Math.max(...values)]);
      }

      // Update new state values
      const diff = [];
      for (const [state, value] of stateValues) {
        const previousValue = this.getValue(state);
        diff.push(Math.abs(previousValue - value));
        this.setValue(state, value);
      }
      this.value_diff = diff.reduce((a, b) => a + b, 0) / diff.length;
    }
  }

  metric() {
    return this.value_diff;
  }

  _initializeState() {
    const states = {};
    for (const state of Object.keys(this.grid.states)) {
      states[state] = {
        value: this.initial_value
      };
    }
    this.states = states;
  }
}

export default ValueIteration;
