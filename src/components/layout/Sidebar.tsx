import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronLeft,
  ChevronRight,
  Shield,
  BarChart3,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useSidebarStore } from "../../stores/sidebarStore";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/courses", label: "课程中心", icon: BookOpen },
  { path: "/learn", label: "学习模块", icon: GraduationCap },
  { path: "/community", label: "社区", icon: Users },
  { path: "/leaderboard", label: "排行榜", icon: Trophy },
  { path: "/profile", label: "个人中心", icon: User },
];

const adminNavItems = [
  { path: "/admin", label: "管理仪表盘", icon: BarChart3 },
  { path: "/admin/users", label: "用户管理", icon: Shield },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-dark-card border-r border-dark-border z-50 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 border-b border-dark-border flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-white">L</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold gradient-text whitespace-nowrap overflow-hidden"
              >
                LinguaFlow
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <AnimatePresence>
        {user && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-b border-dark-border overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-12 h-12 rounded-full border-2 border-primary-500 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{user.username}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{user.streak} 天连续</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                  : "text-gray-400 hover:bg-dark-bg hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-primary-400" : "group-hover:text-white"
                }`}
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {user?.role === 'admin' && (
        <div className="p-4 border-t border-dark-border">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-gray-500 uppercase tracking-wider mb-2"
              >
                管理员
              </motion.p>
            )}
          </AnimatePresence>
          <div className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                      : "text-gray-400 hover:bg-dark-bg hover:text-white"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? "text-primary-400" : "group-hover:text-white"
                    }`}
                  />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-dark-border space-y-1">
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-dark-bg hover:text-white transition-all duration-200 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "设置" : undefined}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium whitespace-nowrap"
              >
                设置
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "退出登录" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium whitespace-nowrap"
              >
                退出登录
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-dark-card border border-dark-border rounded-full flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-colors"
        title={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </aside>
  );
};
