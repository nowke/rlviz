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

/**
 * Download a JS object as JSON file
 *
 * @param {object} data - Javascript object to be downlded as JSON
 * @param {string} title - Title of the file without extension
 */
export const downloadJSON = (data, title) => {
  const content = JSON.stringify(data);
  const blob = new Blob([content], {
    type: "application/json"
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${title}.json`;
  link.click();
};
