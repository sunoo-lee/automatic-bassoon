import { create } from "zustand";

interface AuthStore {
  token: string;
  setToken: (newToken: string) => void;
}

const authStore = create<AuthStore>((set, get) => ({
  token: "",
  setToken: async (newToken: string) => {
    set((state) => ({ token: newToken }));
  },
}));

export default authStore;
