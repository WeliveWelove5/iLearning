import { create } from "zustand";
import type { Course, Language, ProficiencyLevel } from "../types";
import { courses } from "../data/mockData";

interface CourseState {
  courses: Course[];
  selectedLanguage: Language | "all";
  selectedLevel: ProficiencyLevel | "all";
  searchQuery: string;
  
  setSelectedLanguage: (language: Language | "all") => void;
  setSelectedLevel: (level: ProficiencyLevel | "all") => void;
  setSearchQuery: (query: string) => void;
  getFilteredCourses: () => Course[];
  getCourseById: (id: string) => Course | undefined;
  getCoursesByLanguage: (language: Language) => Course[];
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: courses,
  selectedLanguage: "all",
  selectedLevel: "all",
  searchQuery: "",

  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setSelectedLevel: (level) => set({ selectedLevel: level }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredCourses: () => {
    const { courses, selectedLanguage, selectedLevel, searchQuery } = get();
    return courses.filter((course) => {
      const matchesLanguage = selectedLanguage === "all" || course.language === selectedLanguage;
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
      const matchesSearch =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLanguage && matchesLevel && matchesSearch;
    });
  },

  getCourseById: (id: string) => {
    return get().courses.find((course) => course.id === id);
  },

  getCoursesByLanguage: (language: Language) => {
    return get().courses.filter((course) => course.language === language);
  },
}));
