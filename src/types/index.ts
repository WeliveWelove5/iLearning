// Language types
export type Language = 'english' | 'japanese' | 'korean';
export type ProficiencyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type LessonType = 'vocabulary' | 'grammar' | 'listening' | 'speaking';
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type UserRole = 'user' | 'vip' | 'admin';

// User types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  targetLanguage: Language;
  proficiencyLevel: ProficiencyLevel;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
  streak: number;
  totalStudyTime: number;
  isActive: boolean;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  targetLanguage: Language;
}

// Course types
export interface Course {
  id: string;
  language: Language;
  level: ProficiencyLevel;
  title: string;
  description: string;
  coverImage: string;
  totalLessons: number;
  estimatedHours: number;
  lessons: Lesson[];
  enrolledCount: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  type: LessonType;
  content: VocabularyContent | GrammarContent | ListeningContent | SpeakingContent;
}

// Lesson content types
export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface VocabularyContent {
  items: VocabularyItem[];
}

export interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GrammarContent {
  theory: string;
  questions: GrammarQuestion[];
}

export interface ListeningContent {
  audioUrl: string;
  transcript: string;
  translation: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export interface SpeakingContent {
  sentences: {
    id: string;
    text: string;
    translation: string;
    audioUrl: string;
  }[];
}

// Progress types
export interface LearningProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  status: ProgressStatus;
  score: number;
  completedAt?: Date;
  timeSpent: number;
}

export interface DailyProgress {
  date: string;
  studyTime: number;
  lessonsCompleted: number;
  wordsLearned: number;
}

// Achievement types
export interface Achievement {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  unlockedAt?: Date;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  achievement: Achievement;
}

// Community types
export interface Post {
  id: string;
  userId: string;
  author: User;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  author: User;
  content: string;
  createdAt: Date;
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  studyTime: number;
  streak: number;
}

// Study session types
export interface StudySession {
  id: string;
  userId: string;
  lessonId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

// Navigation types
export interface NavItem {
  label: string;
  path: string;
  icon: string;
  requiresAuth: boolean;
}

// Flash card types
export interface FlashCard {
  id: string;
  front: string;
  back: string;
  pronunciation?: string;
  mastered: boolean;
}

// Admin types
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalStudyTime: number;
  averageSessionTime: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  dailyActiveUsers: number[];
  weeklyActiveUsers: number[];
  monthlyActiveUsers: number[];
}

export interface UserStats {
  userId: string;
  user: User;
  totalStudyTime: number;
  sessionsCount: number;
  lastActiveAt: Date;
  coursesCompleted: number;
  wordsLearned: number;
}
