import create from "zustand";
// import { persist } from 'zustand/middleware'

export const useCollectionsStore = create((set) => ({
  collections: [],
  setCollections: (collections) => {
    set({
      collections: [...collections],
    });
  },
}));
