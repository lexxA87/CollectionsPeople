import create from "zustand";

export const useThemesStore = create((set) => ({
  themes: [],
  setThemes: (themes) => {
    set({
      themes: [...themes],
    });
  },
}));
