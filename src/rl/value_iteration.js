import GridWorld from "./grid_world";

export function valueIteration() {
  console.log("Doing value iteration");
  const grid = new GridWorld(
    5,
    4,
    [1, 1],
    [
      [4, 4, 1],
      [4, 3, -1]
    ],
    [[2, 3]],
    -0.01,
    0.8
  );
  console.log(grid.states);
  console.log(grid.takeStochasticAction("D"));
  console.log(grid.nextState([4, 4], "R"));
  console.log(grid.terminalRewards);
  console.log(grid.getTransitions([1, 1], "R"));
}

export default {};
