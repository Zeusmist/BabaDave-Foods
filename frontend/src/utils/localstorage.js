export const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const updateLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};
