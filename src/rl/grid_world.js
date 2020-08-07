class GridWorld {
  constructor(grid, stochasticity = 0.8) {
    this.width = grid.width;
    this.height = grid.height;
    this._grid = grid;
    this._initializeStates();
    this.prob = stochasticity;
  }

  takeStochasticAction(action) {
    if (Math.random() <= this.prob) {
      return action;
    } else if (action === "U" || action === "D") {
      return Math.random() > 0.5 ? "L" : "R";
    } else if (action === "L" || action === "R") {
      return Math.random() > 0.5 ? "U" : "D";
    }
  }

  nextState(state, action, livingReward) {
    if (this.isTerminal(state)) {
      return [state, this.states[state].reward];
    }

    let currentState = this._coordinates(state);
    let [x, y] = currentState;
    if (action === "U") x = Math.max(0, x - 1);
    if (action === "D") x = Math.min(this.height - 1, x + 1);
    if (action === "R") y = Math.min(this.width - 1, y + 1);
    if (action === "L") y = Math.max(0, y - 1);
    let nextState = [x, y];

    if (this.isDisallowed(this._stateRepr(nextState))) {
      nextState = currentState;
    }

    let reward;
    if (this.states[state].living) {
      reward = livingReward;
    } else {
      reward = this.states[state].reward;
    }

    return [this._stateRepr(nextState), reward];
  }

  getTransitions(state, action, livingReward) {
    const transitions = [];
    const currentState = this.states[state];
    if (currentState.terminal) {
      transitions.push([1.0, null, currentState.reward]);
      return transitions;
    }

    transitions.push([
      this.prob,
      ...this.nextState(state, action, livingReward)
    ]);
    if (this.prob === 1.0) return transitions;
    const probRem = (1 - this.prob) / 2;

    if (action === "U" || action === "D") {
      transitions.push([probRem, ...this.nextState(state, "L", livingReward)]);
      transitions.push([probRem, ...this.nextState(state, "R", livingReward)]);
    } else if (action === "L" || action === "R") {
      transitions.push([probRem, ...this.nextState(state, "U", livingReward)]);
      transitions.push([probRem, ...this.nextState(state, "D", livingReward)]);
    }
    return transitions;
  }

  isTerminal(state) {
    if (this.isDisallowed(state)) {
      return false;
    }
    return this.states[state].terminal;
  }

  isDisallowed(state) {
    const r = Object.prototype.hasOwnProperty.call(
      this.disallowedStates,
      state
    );
    return r;
  }

  isLiving(state) {
    if (this.isDisallowed(state)) {
      return false;
    }
    return this.states[state].living;
  }

  getReward(state) {
    if (this.isDisallowed(state)) {
      return 0.0;
    }
    return this.states[state].reward;
  }

  get actions() {
    return ["U", "D", "L", "R"];
  }

  _initializeStates() {
    const allowedStates = {};
    const disallowedStates = {};
    for (const s of Object.keys(this._grid.states)) {
      const state = this._grid.states[s];
      if (state.disabled) {
        disallowedStates[s] = state;
      } else {
        allowedStates[s] = state;
      }
    }

    this.states = allowedStates;
    this.disallowedStates = disallowedStates;
  }

  _coordinates(state) {
    return state.split(",").map(i => parseInt(i));
  }

  _stateRepr(state) {
    return `${state[0]},${state[1]}`;
  }
}

export default GridWorld;
