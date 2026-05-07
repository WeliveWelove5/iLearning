import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AdminStats, UserStats } from "../types";

interface AdminState {
  users: User[];
  adminStats: AdminStats;
  isLoading: boolean;
  
  fetchUsers: () => Promise<void>;
  fetchStats: () => Promise<void>;
  banUser: (userId: string) => void;
  unbanUser: (userId: string) => void;
  deleteUser: (userId: string) => void;
  updateUserRole: (userId: string, role: 'user' | 'vip' | 'admin') => void;
}

const mockUsers: User[] = [
  {
    id: "user-1",
    email: "demo@example.com",
    username: "demo_user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
    targetLanguage: "english",
    proficiencyLevel: "B1",
    role: "user",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
    streak: 15,
    totalStudyTime: 36000,
    isActive: true,
  },
  {
    id: "user-2",
    email: "alice@example.com",
    username: "alice_lang",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    targetLanguage: "japanese",
    proficiencyLevel: "A2",
    role: "vip",
    createdAt: new Date("2024-02-20"),
    lastLogin: new Date(Date.now() - 86400000),
    streak: 30,
    totalStudyTime: 72000,
    isActive: true,
  },
  {
    id: "user-3",
    email: "bob@example.com",
    username: "bob_learner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    targetLanguage: "korean",
    proficiencyLevel: "A1",
    role: "user",
    createdAt: new Date("2024-03-10"),
    lastLogin: new Date(Date.now() - 172800000),
    streak: 5,
    totalStudyTime: 18000,
    isActive: true,
  },
  {
    id: "user-4",
    email: "charlie@example.com",
    username: "charlie_kr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
    targetLanguage: "korean",
    proficiencyLevel: "B2",
    role: "user",
    createdAt: new Date("2024-01-05"),
    lastLogin: new Date(Date.now() - 259200000),
    streak: 0,
    totalStudyTime: 54000,
    isActive: false,
  },
  {
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
  },
];

const mockAdminStats: AdminStats = {
  totalUsers: 1250,
  activeUsers: 856,
  totalStudyTime: 1250000,
  averageSessionTime: 1800,
  newUsersToday: 12,
  newUsersThisWeek: 85,
  newUsersThisMonth: 320,
  dailyActiveUsers: [120, 145, 132, 158, 167, 142, 138],
  weeklyActiveUsers: [820, 845, 856, 890, 920, 875, 856],
  monthlyActiveUsers: [3200, 3450, 3680, 3890, 4100, 3950, 3850],
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      adminStats: mockAdminStats,
      isLoading: false,

      fetchUsers: async () => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ users: mockUsers, isLoading: false });
      },

      fetchStats: async () => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ adminStats: mockAdminStats, isLoading: false });
      },

      banUser: (userId: string) => {
        const { users } = get();
        set({
          users: users.map((user) =>
            user.id === userId ? { ...user, isActive: false } : user
          ),
        });
      },

      unbanUser: (userId: string) => {
        const { users } = get();
        set({
          users: users.map((user) =>
            user.id === userId ? { ...user, isActive: true } : user
          ),
        });
      },

      deleteUser: (userId: string) => {
        const { users } = get();
        set({ users: users.filter((user) => user.id !== userId) });
      },

      updateUserRole: (userId: string, role: 'user' | 'vip' | 'admin') => {
        const { users } = get();
        set({
          users: users.map((user) =>
            user.id === userId ? { ...user, role } : user
          ),
        });
      },
    }),
    {
      name: "admin-storage",
    }
  )
);
