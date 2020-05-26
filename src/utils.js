export const delay = ms => new Promise(res => setTimeout(res, ms));
export const toFloat = v => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));
