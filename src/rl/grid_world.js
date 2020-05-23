class GridWorld {
  constructor(
    width,
    height,
    start,
    terminals,
    disallowedStates = [],
    livingReward = -0.01,
    stochasticity = 0.8
  ) {
    this.width = width;
    this.height = height;
    this.start = start;
    this.terminals = this._toSet(terminals);
    this.terminalRewards = this._getTerminalRewards(terminals);
    this.disallowedStates = this._toSet(disallowedStates);
    this.livingReward = livingReward;
    this.prob = stochasticity;
    this.states = this._states();
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

  nextState(state, action) {
    const stateRepr = this._stateRepr(state);
    if (this.terminals.has(stateRepr)) {
      return { state, reward: this.terminalRewards[stateRepr] };
    }

    let [x, y] = state;
    if (action === "U") y = Math.min(this.height, y + 1);
    if (action === "D") y = Math.max(1, y - 1);
    if (action === "R") x = Math.min(this.width, x + 1);
    if (action === "L") x = Math.max(1, x - 1);
    let nextState = [x, y];
    if (this.isDisallowed(nextState)) {
      nextState = state;
    }

    return [nextState, this.livingReward];
  }

  getTransitions(state, action) {
    const transitions = [];
    transitions.push([this.prob, ...this.nextState(state, action)]);
    if (this.prob === 1.0) return transitions;
    const probRem = (1 - this.prob) / 2;

    if (action === "U" || action === "D") {
      transitions.push([probRem, ...this.nextState(state, "L")]);
      transitions.push([probRem, ...this.nextState(state, "R")]);
    } else if (action === "L" || action === "R") {
      transitions.push([probRem, ...this.nextState(state, "U")]);
      transitions.push([probRem, ...this.nextState(state, "D")]);
    }

    return transitions;
  }

  isTerminal(state) {
    console.log("Terminal check", state);
    return this.terminals.has(this._stateRepr(state));
  }

  isDisallowed(state) {
    return this.disallowedStates.has(this._stateRepr(state));
  }

  getReward(state) {
    if (this.isDisallowed(state)) return 0;
    if (this.isTerminal(state)) {
      return this.terminalRewards[this._stateRepr(state)];
    }
    return this.livingReward;
  }

  _toSet(states) {
    return new Set(states.map(state => this._stateRepr(state)));
  }

  _stateRepr(state) {
    return `${state[0]},${state[1]}`;
  }

  _states() {
    const nStates = this.width * this.height;
    const states = [...Array(nStates).keys()]
      .map(i => [Math.floor(i / this.height) + 1, (i % this.height) + 1])
      .filter(state => !this.disallowedStates.has(this._stateRepr(state)));
    return states;
  }

  _getTerminalRewards(states) {
    return Object.fromEntries(
      states.map(state => [this._stateRepr(state), state[2]])
    );
  }
}

export default GridWorld;
