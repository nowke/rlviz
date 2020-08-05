import Ajv from "ajv";

export const GRID_CLASSIC_4x3 = {
  id: "GRID_CLASSIC_4x3",
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
  id: "GRID_BRIDGE_CROSSING",
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

export const GRID_OBSTACLE = {
  id: "GRID_OBSTACLE",
  name: "Obstacle",
  width: 5,
  height: 5,
  states: {
    "0,0": { terminal: false, disabled: false, reward: 0 },
    "0,1": { terminal: false, disabled: false, reward: 0 },
    "0,2": { terminal: false, disabled: false, reward: 0 },
    "0,3": { terminal: false, disabled: false, reward: 0 },
    "0,4": { terminal: false, disabled: false, reward: 0 },
    "1,0": { terminal: false, disabled: false, reward: 0 },
    "1,1": { terminal: false, disabled: false, reward: 0 },
    "1,2": { terminal: false, disabled: false, reward: 0 },
    "1,3": { terminal: false, disabled: false, reward: 0 },
    "1,4": { terminal: false, disabled: false, reward: 0 },
    "2,0": { terminal: false, disabled: false, reward: 0 },
    "2,1": { terminal: false, disabled: false, reward: 0 },
    "2,2": { terminal: false, disabled: true, reward: 0 },
    "2,3": { terminal: false, disabled: true, reward: 0 },
    "2,4": { terminal: false, disabled: true, reward: 0 },
    "3,0": { terminal: false, disabled: false, reward: 0 },
    "3,1": { terminal: false, disabled: false, reward: 0 },
    "3,2": { terminal: false, disabled: true, reward: 0 },
    "3,3": { terminal: false, disabled: false, reward: 0 },
    "3,4": { terminal: false, disabled: false, reward: 0 },
    "4,0": { terminal: false, disabled: false, reward: 0 },
    "4,1": { terminal: false, disabled: false, reward: 0 },
    "4,2": { terminal: false, disabled: false, reward: 0 },
    "4,3": { terminal: false, disabled: false, reward: 0 },
    "4,4": { terminal: true, disabled: false, reward: 1 }
  }
};

export const GRID_HALLWAY = {
  id: "GRID_HALLWAY",
  name: "Hallway",
  width: 10,
  height: 10,
  states: {
    "0,0": { terminal: false, disabled: false, reward: 0 },
    "0,1": { terminal: false, disabled: false, reward: 0 },
    "0,2": { terminal: false, disabled: false, reward: 0 },
    "0,3": { terminal: false, disabled: false, reward: 0 },
    "0,4": { terminal: false, disabled: true, reward: 0 },
    "0,5": { terminal: false, disabled: false, reward: 0 },
    "0,6": { terminal: false, disabled: false, reward: 0 },
    "0,7": { terminal: false, disabled: false, reward: 0 },
    "0,8": { terminal: false, disabled: false, reward: 0 },
    "0,9": { terminal: false, disabled: false, reward: 0 },
    "1,0": { terminal: false, disabled: false, reward: 0 },
    "1,1": { terminal: false, disabled: false, reward: 0 },
    "1,2": { terminal: false, disabled: false, reward: 0 },
    "1,3": { terminal: false, disabled: false, reward: 0 },
    "1,4": { terminal: false, disabled: true, reward: 0 },
    "1,5": { terminal: false, disabled: false, reward: 0 },
    "1,6": { terminal: false, disabled: false, reward: 0 },
    "1,7": { terminal: false, disabled: false, reward: 0 },
    "1,8": { terminal: false, disabled: false, reward: 0 },
    "1,9": { terminal: false, disabled: false, reward: 0 },
    "2,0": { terminal: false, disabled: false, reward: 0 },
    "2,1": { terminal: false, disabled: false, reward: 0 },
    "2,2": { terminal: false, disabled: false, reward: 0 },
    "2,3": { terminal: false, disabled: false, reward: 0 },
    "2,4": { terminal: false, disabled: true, reward: 0 },
    "2,5": { terminal: false, disabled: false, reward: -1 },
    "2,6": { terminal: false, disabled: false, reward: 0 },
    "2,7": { terminal: false, disabled: false, reward: 0 },
    "2,8": { terminal: false, disabled: false, reward: 0 },
    "2,9": { terminal: false, disabled: false, reward: 0 },
    "3,0": { terminal: false, disabled: false, reward: 0 },
    "3,1": { terminal: true, disabled: false, reward: -1 },
    "3,2": { terminal: false, disabled: false, reward: 0 },
    "3,3": { terminal: false, disabled: false, reward: 0 },
    "3,4": { terminal: false, disabled: false, reward: 0 },
    "3,5": { terminal: false, disabled: false, reward: 0 },
    "3,6": { terminal: false, disabled: false, reward: 0 },
    "3,7": { terminal: true, disabled: false, reward: -1 },
    "3,8": { terminal: false, disabled: false, reward: 0 },
    "3,9": { terminal: false, disabled: false, reward: 0 },
    "4,0": { terminal: false, disabled: false, reward: 0 },
    "4,1": { terminal: false, disabled: false, reward: -1 },
    "4,2": { terminal: false, disabled: false, reward: 0 },
    "4,3": { terminal: false, disabled: false, reward: -1 },
    "4,4": { terminal: false, disabled: true, reward: 0 },
    "4,5": { terminal: false, disabled: false, reward: -1 },
    "4,6": { terminal: false, disabled: false, reward: 0 },
    "4,7": { terminal: false, disabled: false, reward: 0 },
    "4,8": { terminal: false, disabled: false, reward: -1 },
    "4,9": { terminal: false, disabled: false, reward: 0 },
    "5,0": { terminal: false, disabled: true, reward: 0 },
    "5,1": { terminal: false, disabled: true, reward: 0 },
    "5,2": { terminal: false, disabled: false, reward: 0 },
    "5,3": { terminal: false, disabled: true, reward: 0 },
    "5,4": { terminal: false, disabled: true, reward: 0 },
    "5,5": { terminal: false, disabled: true, reward: 0 },
    "5,6": { terminal: false, disabled: true, reward: 0 },
    "5,7": { terminal: false, disabled: false, reward: 0 },
    "5,8": { terminal: false, disabled: true, reward: 0 },
    "5,9": { terminal: false, disabled: true, reward: 0 },
    "6,0": { terminal: false, disabled: false, reward: 0 },
    "6,1": { terminal: false, disabled: false, reward: -1 },
    "6,2": { terminal: false, disabled: false, reward: 0 },
    "6,3": { terminal: false, disabled: false, reward: -1 },
    "6,4": { terminal: false, disabled: true, reward: 0 },
    "6,5": { terminal: false, disabled: false, reward: -1 },
    "6,6": { terminal: false, disabled: false, reward: 0 },
    "6,7": { terminal: false, disabled: false, reward: 0 },
    "6,8": { terminal: false, disabled: false, reward: -1 },
    "6,9": { terminal: false, disabled: false, reward: 0 },
    "7,0": { terminal: false, disabled: false, reward: 0 },
    "7,1": { terminal: false, disabled: false, reward: 0 },
    "7,2": { terminal: false, disabled: false, reward: 0 },
    "7,3": { terminal: false, disabled: false, reward: -1 },
    "7,4": { terminal: false, disabled: true, reward: 0 },
    "7,5": { terminal: false, disabled: false, reward: -1 },
    "7,6": { terminal: false, disabled: false, reward: 0 },
    "7,7": { terminal: false, disabled: false, reward: 0 },
    "7,8": { terminal: false, disabled: false, reward: 0 },
    "7,9": { terminal: false, disabled: false, reward: 0 },
    "8,0": { terminal: false, disabled: false, reward: 0 },
    "8,1": { terminal: false, disabled: false, reward: 0 },
    "8,2": { terminal: false, disabled: false, reward: 0 },
    "8,3": { terminal: false, disabled: false, reward: 0 },
    "8,4": { terminal: false, disabled: false, reward: 0 },
    "8,5": { terminal: false, disabled: false, reward: 0 },
    "8,6": { terminal: false, disabled: false, reward: 0 },
    "8,7": { terminal: false, disabled: false, reward: 0 },
    "8,8": { terminal: true, disabled: false, reward: 1 },
    "8,9": { terminal: false, disabled: false, reward: 0 },
    "9,0": { terminal: false, disabled: false, reward: 0 },
    "9,1": { terminal: false, disabled: false, reward: 0 },
    "9,2": { terminal: true, disabled: false, reward: -1 },
    "9,3": { terminal: false, disabled: false, reward: -1 },
    "9,4": { terminal: false, disabled: true, reward: 0 },
    "9,5": { terminal: false, disabled: false, reward: -1 },
    "9,6": { terminal: true, disabled: false, reward: -1 },
    "9,7": { terminal: false, disabled: false, reward: 0 },
    "9,8": { terminal: false, disabled: false, reward: 0 },
    "9,9": { terminal: false, disabled: false, reward: 0 }
  }
};

export const DEFAULT_GRIDS = {
  GRID_CLASSIC_4x3,
  GRID_BRIDGE_CROSSING,
  GRID_OBSTACLE,
  GRID_HALLWAY
};

// GridEditor
export const DEFAULT_GRID_CONFIG = {
  id: "",
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

/**
 * Validate grid object against JSON schema and states
 *
 * @param {object} grid - Grid object
 */
export const validateGrid = grid => {
  const schema = require("@/assets/grid_schema.json");
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(grid);

  if (!valid) return false;

  // Validate `states` according to `width` and `height`
  const size = grid.width * grid.height;
  const states = [...Array(size).keys()].map(
    i => `${i % grid.height},${i % grid.width}`
  );

  for (const state of states) {
    const gridState = grid.states[state];
    if (gridState) {
      if (
        typeof gridState.terminal !== "boolean" ||
        typeof gridState.disabled !== "boolean" ||
        typeof gridState.reward !== "number"
      ) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};
