export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
