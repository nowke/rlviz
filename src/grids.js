export const GRID_CLASSIC_4x3 = {
  name: "Classic 4x3",
  width: 4,
  height: 3,
  start: [1, 1],
  terminals: [
    [4, 3, 1],
    [4, 2, -1]
  ],
  disallowedStates: [[2, 2]],
  livingReward: 0.0,
  stochasticity: 0.8
};

export const GRID_BRIDGE_CROSSING = {
  name: "Bridge Crossing",
  width: 7,
  height: 3,
  start: [2, 2],
  terminals: [
    [1, 2, 1],
    [2, 1, -100],
    [2, 3, -100],
    [3, 1, -100],
    [3, 3, -100],
    [4, 1, -100],
    [4, 3, -100],
    [5, 1, -100],
    [5, 3, -100],
    [6, 1, -100],
    [6, 3, -100],
    [7, 2, 10]
  ],
  disallowedStates: [
    [1, 1],
    [1, 3],
    [7, 1],
    [7, 3]
  ],
  livingReward: 0.0,
  stochasticity: 0.8
};

export const GRIDS = [GRID_CLASSIC_4x3, GRID_BRIDGE_CROSSING];

// GridEditor
export const DEFAULT_GRID_CONFIG = {
  name: "",
  width: 4,
  height: 3,
  states: {
    "0,0": { selected: false, terminal: false, disabled: false, reward: 0 },
    "0,1": { selected: false, terminal: false, disabled: false, reward: 0 },
    "0,2": { selected: false, terminal: false, disabled: false, reward: 0 },
    "0,3": { selected: false, terminal: true, disabled: false, reward: 1 },
    "1,0": { selected: false, terminal: false, disabled: false, reward: 0 },
    "1,1": { selected: false, terminal: false, disabled: true, reward: 0 },
    "1,2": { selected: false, terminal: false, disabled: false, reward: 0 },
    "1,3": { selected: false, terminal: true, disabled: false, reward: -1 },
    "2,0": { selected: false, terminal: false, disabled: false, reward: 0 },
    "2,1": { selected: false, terminal: false, disabled: false, reward: 0 },
    "2,2": { selected: false, terminal: false, disabled: false, reward: 0 },
    "2,3": { selected: false, terminal: false, disabled: false, reward: 0 }
  }
};
