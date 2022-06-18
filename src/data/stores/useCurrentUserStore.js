import create from "zustand";
// import { persist } from 'zustand/middleware'

export const useCurrentUserStore = create((set) => ({
  currentUser: {},
  setCurrentUser: (user) => {
    set({
      currentUser: user,
    });
  },
}));
