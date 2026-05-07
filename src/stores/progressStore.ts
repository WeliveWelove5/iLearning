import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LearningProgress, DailyProgress, Achievement } from "../types";
import { dailyProgress, achievements } from "../data/mockData";

interface ProgressState {
  learningProgress: LearningProgress[];
  dailyProgress: DailyProgress[];
  userAchievements: Achievement[];
  totalStudyTime: number;
  streakDays: number;
  
  addProgress: (progress: LearningProgress) => void;
  updateProgress: (lessonId: string, updates: Partial<LearningProgress>) => void;
  getProgressByCourse: (courseId: string) => LearningProgress[];
  getCompletedLessonsCount: () => number;
  getWeeklyProgress: () => number;
  
  unlockAchievement: (achievementId: string) => void;
  getUnlockedAchievements: () => Achievement[];
  
  recordDailyActivity: (date: string, studyTime: number, lessonsCompleted: number, wordsLearned: number) => void;
  getStudyStreak: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      learningProgress: [],
      dailyProgress: dailyProgress,
      userAchievements: achievements.filter((a) => a.unlockedAt),
      totalStudyTime: 3600 * 24,
      streakDays: 12,

      addProgress: (progress: LearningProgress) => {
        set((state) => ({
          learningProgress: [...state.learningProgress, progress],
        }));
      },

      updateProgress: (lessonId: string, updates: Partial<LearningProgress>) => {
        set((state) => ({
          learningProgress: state.learningProgress.map((p) =>
            p.lessonId === lessonId ? { ...p, ...updates } : p
          ),
        }));
      },

      getProgressByCourse: (courseId: string) => {
        return get().learningProgress.filter((p) => p.courseId === courseId);
      },

      getCompletedLessonsCount: () => {
        return get().learningProgress.filter((p) => p.status === "completed").length;
      },

      getWeeklyProgress: () => {
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return get().dailyProgress.filter((d) => {
          const date = new Date(d.date);
          return date >= weekAgo && date <= today;
        }).length;
      },

      unlockAchievement: (achievementId: string) => {
        const achievement = achievements.find((a) => a.id === achievementId);
        if (achievement && !get().userAchievements.find((a) => a.id === achievementId)) {
          set((state) => ({
            userAchievements: [...state.userAchievements, { ...achievement, unlockedAt: new Date() }],
          }));
        }
      },

      getUnlockedAchievements: () => {
        return get().userAchievements;
      },

      recordDailyActivity: (date: string, studyTime: number, lessonsCompleted: number, wordsLearned: number) => {
        set((state) => {
          const existingIndex = state.dailyProgress.findIndex((d) => d.date === date);
          if (existingIndex >= 0) {
            const updated = [...state.dailyProgress];
            updated[existingIndex] = {
              ...updated[existingIndex],
              studyTime: updated[existingIndex].studyTime + studyTime,
              lessonsCompleted: updated[existingIndex].lessonsCompleted + lessonsCompleted,
              wordsLearned: updated[existingIndex].wordsLearned + wordsLearned,
            };
            return { dailyProgress: updated };
          }
          return {
            dailyProgress: [...state.dailyProgress, { date, studyTime, lessonsCompleted, wordsLearned }],
          };
        });
      },

      getStudyStreak: () => {
        const sorted = [...get().dailyProgress].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        let streak = 0;
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        
        // Check if studied today or yesterday
        const lastStudy = sorted.find((d) => d.studyTime > 0);
        if (!lastStudy || (lastStudy.date !== today && lastStudy.date !== yesterday)) {
          return 0;
        }
        
        for (const day of sorted) {
          if (day.studyTime > 0) {
            streak++;
          } else {
            break;
          }
        }
        
        return streak;
      },
    }),
    {
      name: "progress-storage",
    }
  )
);
