export const delay = ms => new Promise(res => setTimeout(res, ms));
export const toFloat = v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));

export const syncGridStorage = store => {
  store.subscribe((mutation, state) => {
    if (
      mutation.type === "grid/addGrid" ||
      mutation.type === "grid/removeGrid" ||
      mutation.type === "grid/updateGrid"
    ) {
      localStorage.setItem("grids", JSON.stringify(state.grid.grids));
    }
  });
};
