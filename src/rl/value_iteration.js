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
    this.disallowedStates = this._toSet(disallowedStates);
    this.livingReward = livingReward;
    this.prob = stochasticity;
    this.states = this._states();
  }

  transitionProb(state, action) {
    let actionTaken = action;
    if (Math.random() >= this.stochasticity) {
      if (action === "U" || action === "D") {
        actionTaken = Math.random() > 0.5 ? "L" : "R";
      } else if (action === "L" || action === "R") {
        actionTaken = Math.random() > 0.5 ? "U" : "D";
      }
    }
    return actionTaken;
  }

  _toSet(states) {
    return new Set(states.map(state => `${state[0]},${state[1]}`));
  }

  _states() {
    const nStates = this.width * this.height;
    const states = [...Array(nStates).keys()]
      .map(i => [(i % this.width) + 1, (i % this.height) + 1])
      .filter(state => {
        const s = `${state[0]},${state[1]}`;
        return !this.disallowedStates.has(s);
      });
    return states;
  }
}

function valueIteration() {
  console.clear();
  console.log("Doing value iteration");
  const grid = new GridWorld(
    5,
    4,
    [1, 1],
    [
      [4, 4],
      [4, 3]
    ],
    [[2, 3]],
    -0.01,
    0.8
  );
  console.log(grid.states);
}

export default valueIteration;
