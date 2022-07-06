import create from "zustand";
// import { persist } from 'zustand/middleware'

export const useCollectionsStore = create((set) => ({
  collections: [],
  collectionsSort: [],
  setCollections: (collections) => {
    set({
      collections: [...collections],
    });
  },
  setCollectionsSort: (collections) => {
    set({
      collectionsSort: [...collections],
    });
  },
}));
