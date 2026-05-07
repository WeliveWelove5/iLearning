import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  GraduationCap,
  User,
  Users,
  Trophy,
  Settings,
  LogOut,
  Flame,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/courses", label: "课程中心", icon: BookOpen },
  { path: "/learn", label: "学习模块", icon: GraduationCap },
  { path: "/community", label: "社区", icon: Users },
  { path: "/leaderboard", label: "排行榜", icon: Trophy },
  { path: "/profile", label: "个人中心", icon: User },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-dark-card border-r border-dark-border z-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <span className="text-xl font-bold text-white">L</span>
          </div>
          <span className="text-xl font-bold gradient-text">LinguaFlow</span>
        </Link>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-12 h-12 rounded-full border-2 border-primary-500"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{user.username}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>{user.streak} 天连续</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                  : "text-gray-400 hover:bg-dark-bg hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary-400" : "group-hover:text-white"}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-dark-border space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-dark-bg hover:text-white transition-all duration-200">
          <Settings className="w-5 h-5" />
          <span className="font-medium">设置</span>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">退出登录</span>
        </button>
      </div>
    </aside>
  );
};
