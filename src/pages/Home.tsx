import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Users,
  Flame,
  ArrowRight,
  Star,
  Target,
  Zap,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { StatCard } from "../components/common/StatCard";
import { useAuthStore } from "../stores/authStore";
import { useProgressStore } from "../stores/progressStore";
import { studyStats } from "../data/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const Home: React.FC = () => {
  const { user } = useAuthStore();
  const { userAchievements } = useProgressStore();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours} 小时`;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.section variants={itemVariants} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-3xl" />
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                欢迎回来，{user?.username}！
              </h1>
              <p className="text-gray-400 text-lg">
                今天也是充满学习热情的一天，继续加油！
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-orange-400">
                  <Flame className="w-5 h-5" />
                  <span className="font-medium">{user?.streak} 天连续学习</span>
                </div>
                <div className="w-px h-5 bg-dark-border" />
                <div className="text-gray-400">
                  累计学习 {formatTime(user?.totalStudyTime || 0)}
                </div>
              </div>
            </div>
            <Link to="/learn">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                继续学习
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="掌握单词"
            value={studyStats.masteredWords}
            subtitle={`共 ${studyStats.totalWords} 个`}
            icon={BookOpen}
            color="primary"
            delay={0}
          />
          <StatCard
            title="语法点数"
            value={studyStats.grammarPoints}
            subtitle="已掌握"
            icon={Target}
            color="accent"
            delay={0.1}
          />
          <StatCard
            title="听力训练"
            value={`${studyStats.listeningHours}h`}
            subtitle="累计时长"
            icon={Zap}
            color="success"
            delay={0.2}
          />
          <StatCard
            title="口语练习"
            value={studyStats.speakingSessions}
            subtitle="已完成"
            icon={Trophy}
            color="warning"
            delay={0.3}
          />
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-bold text-white mb-4">快速开始</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/learn">
            <Card className="h-full hover:border-primary-500/50 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">单词记忆</h3>
                  <p className="text-sm text-gray-400">今天还有 15 个单词待复习</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/learn">
            <Card className="h-full hover:border-accent-500/50 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center group-hover:bg-accent-500/30 transition-colors">
                  <Target className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">语法练习</h3>
                  <p className="text-sm text-gray-400">完成今日语法挑战</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/community">
            <Card className="h-full hover:border-green-500/50 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">社区互动</h3>
                  <p className="text-sm text-gray-400">参与讨论，分享学习心得</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </motion.section>

      {/* Achievements & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">最近成就</h2>
            <Link to="/profile" className="text-primary-400 hover:text-primary-300 text-sm">
              查看全部
            </Link>
          </div>
          <Card>
            <div className="space-y-4">
              {userAchievements.slice(0, 4).map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-dark-bg/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {achievement.unlockedAt
                      ? new Date(achievement.unlockedAt).toLocaleDateString("zh-CN")
                      : "未解锁"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Weekly Goal */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">本周目标</h2>
            <span className="text-sm text-gray-400">
              {studyStats.weeklyProgress}/{studyStats.weeklyGoal} 天
            </span>
          </div>
          <Card>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">学习天数</span>
                  <span className="text-white font-medium">
                    {Math.round((studyStats.weeklyProgress / studyStats.weeklyGoal) * 100)}%
                  </span>
                </div>
                <div className="h-3 bg-dark-bg rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(studyStats.weeklyProgress / studyStats.weeklyGoal) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">单词掌握</span>
                  <span className="text-white font-medium">
                    {Math.round((studyStats.masteredWords / studyStats.totalWords) * 100)}%
                  </span>
                </div>
                <div className="h-3 bg-dark-bg rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(studyStats.masteredWords / studyStats.totalWords) * 100}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-dark-border">
                <p className="text-sm text-gray-400">
                  再坚持 {studyStats.weeklyGoal - studyStats.weeklyProgress} 天即可完成本周目标！
                </p>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </motion.div>
  );
};
