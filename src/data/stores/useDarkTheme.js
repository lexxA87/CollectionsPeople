import create from "zustand";

export const useDarkTheme = create((set) => ({
  isDarkTheme: localStorage.getItem("darkTheme") || false,
  setDarkTheme: (bool) => {
    localStorage.setItem("darkTheme", bool);
    set({
      isDarkTheme: bool,
    });
  },
}));
