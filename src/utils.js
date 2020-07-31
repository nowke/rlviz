import { GRIDS_LOCALSTORAGE_KEY } from "@/constants";

export const delay = ms => new Promise(res => setTimeout(res, ms));
export const toFloat = v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));

export const syncGridStorage = store => {
  store.subscribe((mutation, state) => {
    if (
      mutation.type === "grid/setGrids" ||
      mutation.type === "grid/addGrid" ||
      mutation.type === "grid/removeGrid" ||
      mutation.type === "grid/updateGrid"
    ) {
      localStorage.setItem(
        GRIDS_LOCALSTORAGE_KEY,
        JSON.stringify(state.grid.grids)
      );
    }
  });
};

/**
 * Source: https://gist.github.com/gordonbrander/2230317
 */
export const uuid = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
