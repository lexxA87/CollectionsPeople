import create from "zustand";

export const useTagsStore = create((set) => ({
  tags: [],
  setTags: (tags) => {
    set({
      tags: [...tags],
    });
  },
}));
