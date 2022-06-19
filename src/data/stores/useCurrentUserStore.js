import create from "zustand";
// import { persist } from 'zustand/middleware'

export const useCurrentUserStore = create((set) => ({
  currentUser: {},
  isAuth: false,
  setCurrentUser: (user) => {
    set({
      currentUser: user,
    });
  },
  setIsAuth: (bool) => {
    if (bool) {
      set({
        isAuth: bool,
      });
    } else {
      localStorage.removeItem("token");
      set({
        isAuth: bool,
      });
    }
  },
}));
