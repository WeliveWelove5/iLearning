import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, RegisterData } from "../types";
import { currentUser } from "../data/mockData";

const adminUser: User = {
  id: "admin-1",
  email: "admin@linguaflow.com",
  username: "admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  targetLanguage: "english",
  proficiencyLevel: "C2",
  role: "admin",
  createdAt: new Date("2023-12-01"),
  lastLogin: new Date(),
  streak: 100,
  totalStudyTime: 180000,
  isActive: true,
};

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
    (set) => ({
      user: currentUser,
      isAuthenticated: true,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const isAdmin = email === "admin@linguaflow.com" || email === "admin";
        set({ user: isAdmin ? adminUser : currentUser, isAuthenticated: true, isLoading: false });
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          username: data.username,
          targetLanguage: data.targetLanguage,
          proficiencyLevel: "A1",
          role: "user",
          createdAt: new Date(),
          lastLogin: new Date(),
          streak: 1,
          totalStudyTime: 0,
          isActive: true,
        };
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...data } });
        }
      },

      updateStreak: () => {
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          const lastLogin = new Date(currentUser.lastLogin);
          const today = new Date();
          const diffDays = Math.floor(
            (today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (diffDays === 1) {
            set({ user: { ...currentUser, streak: currentUser.streak + 1, lastLogin: new Date() } });
          } else if (diffDays > 1) {
            set({ user: { ...currentUser, streak: 1, lastLogin: new Date() } });
          }
        }
      },

      addStudyTime: (seconds: number) => {
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              totalStudyTime: currentUser.totalStudyTime + seconds,
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
