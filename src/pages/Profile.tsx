import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Flame,
  Clock,
  BookOpen,
  Trophy,
  Edit,
  Settings,
  Award,
  Target,
  Zap,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { ProgressRing } from "../components/common/ProgressRing";
import { useAuthStore } from "../stores/authStore";
import { useProgressStore } from "../stores/progressStore";
import { studyStats, achievements } from "../data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const { userAchievements, dailyProgress } = useProgressStore();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}小时${minutes}分钟`;
  };

  // Prepare chart data (last 7 days)
  const chartData = dailyProgress.slice(-7).map((day) => ({
    date: new Date(day.date).toLocaleDateString("zh-CN", { weekday: "short" }),
    minutes: Math.floor(day.studyTime / 60),
  }));

  const unlockedCount = userAchievements.length;
  const totalAchievements = achievements.length;
  const achievementProgress = Math.round((unlockedCount / totalAchievements) * 100);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10" />
          <div className="relative flex flex-col md:flex-row items-center gap-6 p-4">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-24 h-24 rounded-full border-4 border-primary-500"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-dark-card border border-dark-border rounded-full flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-colors">
                <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
              <p className="text-gray-400 mt-1">{user?.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-lg">
                  {user?.proficiencyLevel} 级别
                </span>
                <span className="flex items-center gap-1 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  加入于 {user?.createdAt.toLocaleDateString("zh-CN")}
                </span>
                <span className="flex items-center gap-1 text-orange-400 text-sm">
                  <Flame className="w-4 h-4" />
                  {user?.streak} 天连续学习
                </span>
              </div>
            </div>
            <Button variant="secondary" leftIcon={<Settings className="w-4 h-4" />}>
              编辑资料
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <Clock className="w-6 h-6 text-primary-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{formatTime(user?.totalStudyTime || 0)}</p>
            <p className="text-sm text-gray-400">累计学习</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <BookOpen className="w-6 h-6 text-accent-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{studyStats.masteredWords}</p>
            <p className="text-sm text-gray-400">掌握单词</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{unlockedCount}</p>
            <p className="text-sm text-gray-400">获得成就</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{studyStats.grammarPoints}</p>
            <p className="text-sm text-gray-400">语法点数</p>
          </div>
        </Card>
      </motion.div>

      {/* Charts & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Time Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">本周学习时长</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 6 ? "#6366F1" : "#334155"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Achievement Progress */}
        <motion.div variants={itemVariants}>
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">成就进度</h3>
            <div className="flex items-center justify-center py-8">
              <ProgressRing progress={achievementProgress} size={160} strokeWidth={12}>
                <div className="text-center">
                  <Trophy className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-white">{achievementProgress}%</p>
                  <p className="text-sm text-gray-400">
                    {unlockedCount}/{totalAchievements}
                  </p>
                </div>
              </ProgressRing>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-white mb-4">我的成就</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => {
            const isUnlocked = userAchievements.some((a) => a.id === achievement.id);
            
            return (
              <Card
                key={achievement.id}
                className={`${isUnlocked ? "" : "opacity-50"}`}
                glow={isUnlocked}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isUnlocked ? "bg-accent-500/20" : "bg-dark-bg"
                    }`}
                  >
                    <Award
                      className={`w-6 h-6 ${isUnlocked ? "text-accent-400" : "text-gray-600"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    {isUnlocked && achievement.unlockedAt && (
                      <p className="text-xs text-accent-400 mt-2">
                        解锁于 {new Date(achievement.unlockedAt).toLocaleDateString("zh-CN")}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Skills Radar */}
      <motion.div variants={itemVariants}>
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">能力分布</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "词汇量", value: 75, icon: BookOpen, color: "primary" },
              { label: "语法掌握", value: 60, icon: Target, color: "accent" },
              { label: "听力理解", value: 70, icon: Zap, color: "success" },
              { label: "口语表达", value: 55, icon: Award, color: "warning" },
            ].map((skill) => (
              <div key={skill.label} className="text-center p-4">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="8"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke={skill.color === "primary" ? "#6366F1" : skill.color === "accent" ? "#F59E0B" : skill.color === "success" ? "#10B981" : "#F97316"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${skill.value * 2.26} 226`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <skill.icon className={`w-6 h-6 ${skill.color === "primary" ? "text-primary-400" : skill.color === "accent" ? "text-accent-400" : skill.color === "success" ? "text-green-400" : "text-orange-400"}`} />
                  </div>
                </div>
                <p className="text-white font-medium">{skill.label}</p>
                <p className="text-2xl font-bold gradient-text">{skill.value}%</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
