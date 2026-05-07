import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-dark-card/80 backdrop-blur-xl border-b border-dark-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-dark-bg text-gray-400"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="搜索课程、单词..."
            className="w-64 pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-dark-bg text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full" />
        </button>

        {/* User */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-white">{user.username}</p>
              <p className="text-xs text-gray-500">{user.proficiencyLevel} 级别</p>
            </div>
            <img
              src={user.avatar}
              alt={user.username}
              className="w-9 h-9 rounded-full border border-dark-border"
            />
          </div>
        )}
      </div>
    </header>
  );
};
