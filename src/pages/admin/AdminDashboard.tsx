import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Clock,
  TrendingUp,
  UserPlus,
  Calendar,
  BarChart3,
} from "lucide-react";
import { Card } from "../../components/common/Card";
import { useAdminStore } from "../../stores/adminStore";

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

export const AdminDashboard: React.FC = () => {
  const { adminStats } = useAdminStore();

  const statsCards = [
    {
      title: "总用户数",
      value: adminStats.totalUsers.toLocaleString(),
      icon: Users,
      color: "primary",
      change: "+12%",
    },
    {
      title: "活跃用户",
      value: adminStats.activeUsers.toLocaleString(),
      icon: UserCheck,
      color: "success",
      change: "+8%",
    },
    {
      title: "总学习时长",
      value: `${Math.round(adminStats.totalStudyTime / 3600)}h`,
      icon: Clock,
      color: "accent",
      change: "+15%",
    },
    {
      title: "平均会话时长",
      value: `${Math.round(adminStats.averageSessionTime / 60)}min`,
      icon: TrendingUp,
      color: "warning",
      change: "+5%",
    },
  ];

  const newUserStats = [
    { label: "今日新增", value: adminStats.newUsersToday },
    { label: "本周新增", value: adminStats.newUsersThisWeek },
    { label: "本月新增", value: adminStats.newUsersThisMonth },
  ];

  const colorClasses = {
    primary: "bg-primary-500/20 text-primary-400",
    success: "bg-green-500/20 text-green-400",
    accent: "bg-accent-500/20 text-accent-400",
    warning: "bg-orange-500/20 text-orange-400",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">管理仪表盘</h1>
          <p className="text-gray-400 mt-1">平台运营数据概览</p>
        </div>
      </div>

      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <span className="text-xs text-green-400 mt-2 inline-block">
                      {stat.change} 较上周
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.section variants={itemVariants} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">用户活跃趋势</h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-500" />
                  日活
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent-500" />
                  周活
                </span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {adminStats.dailyActiveUsers.map((value, index) => {
                const heightPercent = Math.round((value / 200) * 100);
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary-500/60 rounded-t-lg transition-all hover:bg-primary-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-xs text-gray-500">
                      {["周一", "周二", "周三", "周四", "周五", "周六", "周日"][index]}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.section>

        <motion.section variants={itemVariants}>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">新增用户</h2>
            </div>
            <div className="space-y-4">
              {newUserStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-dark-bg/50">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>
      </div>

      <motion.section variants={itemVariants}>
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-accent-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">月度活跃用户</h2>
          </div>
          <div className="h-32 flex items-end justify-between gap-1">
            {adminStats.monthlyActiveUsers.map((value, index) => {
              const heightPercent = Math.round((value / 4500) * 100);
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-primary-500 to-accent-500 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>1月</span>
            <span>2月</span>
            <span>3月</span>
            <span>4月</span>
            <span>5月</span>
            <span>6月</span>
            <span>7月</span>
          </div>
        </Card>
      </motion.section>
    </motion.div>
  );
};
