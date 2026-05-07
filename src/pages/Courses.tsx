import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, Clock, Users, BookOpen, ChevronRight } from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { useCourseStore } from "../stores/courseStore";
import { languageOptions, proficiencyLevels } from "../data/mockData";
import type { Language, ProficiencyLevel } from "../types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Courses: React.FC = () => {
  const {
    selectedLanguage,
    selectedLevel,
    searchQuery,
    setSelectedLanguage,
    setSelectedLevel,
    setSearchQuery,
    getFilteredCourses,
  } = useCourseStore();

  const filteredCourses = getFilteredCourses();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">课程中心</h1>
          <p className="text-gray-400 mt-1">选择适合你的课程，开启语言学习之旅</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="搜索课程..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="space-y-4">
        {/* Language Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">语言:</span>
          <button
            onClick={() => setSelectedLanguage("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedLanguage === "all"
                ? "bg-primary-500 text-white"
                : "bg-dark-card text-gray-400 hover:text-white border border-dark-border"
            }`}
          >
            全部
          </button>
          {languageOptions.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setSelectedLanguage(lang.value as Language)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedLanguage === lang.value
                  ? "bg-primary-500 text-white"
                  : "bg-dark-card text-gray-400 hover:text-white border border-dark-border"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">等级:</span>
          <button
            onClick={() => setSelectedLevel("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedLevel === "all"
                ? "bg-accent-500 text-white"
                : "bg-dark-card text-gray-400 hover:text-white border border-dark-border"
            }`}
          >
            全部
          </button>
          {proficiencyLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setSelectedLevel(level.value as ProficiencyLevel)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedLevel === level.value
                  ? "bg-accent-500 text-white"
                  : "bg-dark-card text-gray-400 hover:text-white border border-dark-border"
              }`}
            >
              {level.value}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Course Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            variants={itemVariants}
            custom={index}
          >
            <Card className="h-full overflow-hidden group">
              {/* Course Image */}
              <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary-500/90 text-white text-xs font-medium rounded-lg">
                      {languageOptions.find((l) => l.value === course.language)?.flag} {languageOptions.find((l) => l.value === course.language)?.label}
                    </span>
                    <span className="px-2 py-1 bg-accent-500/90 text-white text-xs font-medium rounded-lg">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{course.title}</h3>
                </div>
              </div>

              {/* Course Info */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.totalLessons} 课时</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.estimatedHours} 小时</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolledCount.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">学习进度</span>
                  <span className="text-primary-400">0%</span>
                </div>
                <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full" />
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full group/btn">
                开始学习
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-card flex items-center justify-center">
            <Filter className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">没有找到匹配的课程</h3>
          <p className="text-gray-400">尝试调整筛选条件或搜索关键词</p>
        </motion.div>
      )}
    </motion.div>
  );
};
