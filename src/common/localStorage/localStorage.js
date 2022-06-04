import localStorage from "reduxjs-toolkit-persist/es/storage";

export const saveState = (key, state) => {
  try {
    const serializableState = JSON.stringify(state);
    localStorage.setItem(key, serializableState);
  } catch (err) {
    console.log("save state error");
  }
};
export const loadState = (key) => {
  try {
    const serializableState = localStorage.getItem(key);

    if (serializableState === null || serializableState === undefined) {
      return undefined;
    }

    return JSON.parse(serializableState);
  } catch (err) {
    console.log("load state fail");
  }
};
