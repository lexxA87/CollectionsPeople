import create from "zustand";
// import { persist } from 'zustand/middleware'

export const useCollectionsStore = create((set) => ({
  collections: [],
  collectionsForTable: [],
  setCollections: (collections) => {
    set({
      collections: [...collections],
    });
  },
  setCollectionsForTable: (collections) => {
    set({
      collectionsForTable: [...collections],
    });
  },
}));
