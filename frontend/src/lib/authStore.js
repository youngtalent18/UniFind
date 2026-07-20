import { create } from "zustand"
import { authApi } from "./api"

export const useAuthStore = create((set) => ({
  user: null,
  initialized: false,
  setUser: (user) => set({ user }),
  checkAuth: async () => {
    try {
      const { data } = await authApi.profile()
      set({ user: data })
    } catch {
      set({ user: null })
    } finally {
      set({ initialized: true })
    }
  },
  logout: async () => {
    try { await authApi.logout() } finally { set({ user: null }) }
  },
}))
