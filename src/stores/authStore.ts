import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, RegisterData } from "../types";
import { currentUser } from "../data/mockData";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateStreak: () => void;
  addStudyTime: (seconds: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: currentUser,
      isAuthenticated: true,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ user: currentUser, isAuthenticated: true, isLoading: false });
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          username: data.username,
          targetLanguage: data.targetLanguage,
          proficiencyLevel: "A1",
          createdAt: new Date(),
          lastLogin: new Date(),
          streak: 1,
          totalStudyTime: 0,
        };
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...data } });
        }
      },

      updateStreak: () => {
        const { user } = get();
        if (user) {
          const lastLogin = new Date(user.lastLogin);
          const today = new Date();
          const diffDays = Math.floor(
            (today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (diffDays === 1) {
            set({ user: { ...user, streak: user.streak + 1, lastLogin: new Date() } });
          } else if (diffDays > 1) {
            set({ user: { ...user, streak: 1, lastLogin: new Date() } });
          }
        }
      },

      addStudyTime: (seconds: number) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              totalStudyTime: user.totalStudyTime + seconds,
            },
          });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
