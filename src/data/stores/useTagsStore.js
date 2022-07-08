import create from "zustand";

export const useTagsStore = create((set) => ({
  tags: [],
  tagsCloud: [],
  setTags: (tags) => {
    set({
      tags: [...tags],
    });
  },
  setTagsCloud: (tags) => {
    set({
      tags: [...tags],
    });
  },
}));
