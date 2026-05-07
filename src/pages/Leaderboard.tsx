import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Clock, Target, Medal, Crown } from "lucide-react";
import { Card } from "../components/common/Card";
import { useSocialStore } from "../stores/socialStore";
import { useAuthStore } from "../stores/authStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type LeaderboardType = "overall" | "streak" | "time";

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>("overall");
  const { leaderboard } = useSocialStore();
  const { user } = useAuthStore();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-500/20 to-gray-600/10 border-gray-500/30";
      case 3:
        return "bg-gradient-to-r from-orange-500/20 to-orange-600/10 border-orange-500/30";
      default:
        return "";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">学习排行榜</h1>
        <p className="text-gray-400 mt-1">看看谁是本周的学习达人</p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-2">
        {[
          { id: "overall" as const, label: "综合排名", icon: Trophy },
          { id: "streak" as const, label: "连续打卡", icon: Flame },
          { id: "time" as const, label: "学习时长", icon: Clock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary-500 text-white"
                : "bg-dark-card text-gray-400 hover:text-white border border-dark-border"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 items-end">
        {leaderboard.slice(0, 3).map((entry, index) => {
          const positions = [1, 0, 2]; // 2nd, 1st, 3rd
          const position = positions[index];
          const heights = ["h-32", "h-40", "h-28"];
          const colors = ["from-gray-400 to-gray-500", "from-yellow-400 to-yellow-500", "from-orange-400 to-orange-500"];
          
          return (
            <motion.div
              key={entry.user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-4">
                <img
                  src={entry.user.avatar}
                  alt={entry.user.username}
                  className={`w-16 h-16 rounded-full border-4 mx-auto ${
                    index === 0 ? "border-yellow-400" : index === 1 ? "border-gray-400" : "border-orange-400"
                  }`}
                />
                <p className="text-white font-medium mt-2 truncate">{entry.user.username}</p>
                <p className="text-2xl font-bold gradient-text">{entry.score.toLocaleString()}</p>
              </div>
              <div
                className={`${heights[position]} bg-gradient-to-t ${colors[position]} rounded-t-2xl opacity-80`}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Leaderboard List */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="space-y-2">
            {leaderboard.map((entry) => {
              const isCurrentUser = entry.user.id === user?.id;
              
              return (
                <div
                  key={entry.user.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    isCurrentUser ? "bg-primary-500/10 border border-primary-500/30" : "hover:bg-dark-bg"
                  } ${getRankStyle(entry.rank)}`}
                >
                  {/* Rank */}
                  <div className="w-12 flex justify-center">{getRankIcon(entry.rank)}</div>

                  {/* Avatar */}
                  <img
                    src={entry.user.avatar}
                    alt={entry.user.username}
                    className="w-12 h-12 rounded-full border border-dark-border"
                  />

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{entry.user.username}</span>
                      {isCurrentUser && (
                        <span className="px-2 py-0.5 bg-primary-500 text-white text-xs rounded">
                          我
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-400" />
                        {entry.streak} 天
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-400" />
                        {formatTime(entry.studyTime)}
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{entry.score.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">积分</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1,234</p>
              <p className="text-sm text-gray-400">今日活跃学习者</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-sm text-gray-400">最高连续打卡</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">2,456h</p>
              <p className="text-sm text-gray-400">今日总学习时长</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
