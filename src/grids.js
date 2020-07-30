export const GRID_CLASSIC_4x3 = {
  name: "Classic 4x3",
  width: 4,
  height: 3,
  states: {
    "0,0": { terminal: false, disabled: false, reward: 0 },
    "0,1": { terminal: false, disabled: false, reward: 0 },
    "0,2": { terminal: false, disabled: false, reward: 0 },
    "0,3": { terminal: true, disabled: false, reward: 1 },
    "1,0": { terminal: false, disabled: false, reward: 0 },
    "1,1": { terminal: false, disabled: true, reward: 0 },
    "1,2": { terminal: false, disabled: false, reward: 0 },
    "1,3": { terminal: true, disabled: false, reward: -1 },
    "2,0": { terminal: false, disabled: false, reward: 0 },
    "2,1": { terminal: false, disabled: false, reward: 0 },
    "2,2": { terminal: false, disabled: false, reward: 0 },
    "2,3": { terminal: false, disabled: false, reward: 0 }
  }
};

export const GRID_BRIDGE_CROSSING = {
  name: "Bridge Crossing",
  width: 7,
  height: 3,
  states: {
    "0,0": { terminal: false, disabled: true, reward: 0 },
    "0,1": { terminal: true, disabled: false, reward: -100 },
    "0,2": { terminal: true, disabled: false, reward: -100 },
    "0,3": { terminal: true, disabled: false, reward: -100 },
    "0,4": { terminal: true, disabled: false, reward: -100 },
    "0,5": { terminal: true, disabled: false, reward: -100 },
    "0,6": { terminal: false, disabled: true, reward: 0 },
    "1,0": { terminal: true, disabled: false, reward: 1 },
    "1,1": { terminal: false, disabled: false, reward: 0 },
    "1,2": { terminal: false, disabled: false, reward: 0 },
    "1,3": { terminal: false, disabled: false, reward: 0 },
    "1,4": { terminal: false, disabled: false, reward: 0 },
    "1,5": { terminal: false, disabled: false, reward: 0 },
    "1,6": { terminal: true, disabled: false, reward: 10 },
    "2,0": { terminal: false, disabled: true, reward: 0 },
    "2,1": { terminal: true, disabled: false, reward: -100 },
    "2,2": { terminal: true, disabled: false, reward: -100 },
    "2,3": { terminal: true, disabled: false, reward: -100 },
    "2,4": { terminal: true, disabled: false, reward: -100 },
    "2,5": { terminal: true, disabled: false, reward: -100 },
    "2,6": { terminal: false, disabled: true, reward: 0 }
  }
};

export const GRIDS = [GRID_CLASSIC_4x3, GRID_BRIDGE_CROSSING];

// GridEditor
export const DEFAULT_GRID_CONFIG = {
  name: "",
  width: 5,
  height: 4,
  states: {
    "0,0": { terminal: false, disabled: false, reward: 0 },
    "0,1": { terminal: false, disabled: false, reward: 0 },
    "0,2": { terminal: false, disabled: false, reward: 0 },
    "0,3": { terminal: false, disabled: false, reward: 0 },
    "0,4": { terminal: true, disabled: false, reward: 1 },
    "1,0": { terminal: false, disabled: false, reward: 0 },
    "1,1": { terminal: false, disabled: true, reward: 0 },
    "1,2": { terminal: false, disabled: true, reward: 0 },
    "1,3": { terminal: false, disabled: false, reward: 0 },
    "1,4": { terminal: false, disabled: false, reward: 0 },
    "2,0": { terminal: false, disabled: false, reward: 0 },
    "2,1": { terminal: false, disabled: true, reward: 0 },
    "2,2": { terminal: false, disabled: true, reward: 0 },
    "2,3": { terminal: false, disabled: false, reward: 0 },
    "2,4": { terminal: false, disabled: false, reward: 0 },
    "3,0": { terminal: false, disabled: false, reward: 0 },
    "3,1": { terminal: false, disabled: false, reward: 0 },
    "3,2": { terminal: false, disabled: false, reward: 0 },
    "3,3": { terminal: false, disabled: false, reward: 0 },
    "3,4": { terminal: true, disabled: false, reward: -1 }
  }
};
