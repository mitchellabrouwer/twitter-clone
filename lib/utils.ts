export const getFromStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};

export const setToStorage = (key, value) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, value);
  }
};
