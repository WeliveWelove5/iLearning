import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  Trash2,
  Shield,
  Crown,
  User,
} from "lucide-react";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { useAdminStore } from "../../stores/adminStore";
import type { User, UserRole } from "../../types";

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

const roleColors = {
  user: "bg-gray-500/20 text-gray-400",
  vip: "bg-accent-500/20 text-accent-400",
  admin: "bg-primary-500/20 text-primary-400",
};

const roleIcons = {
  user: User,
  vip: Crown,
  admin: Shield,
};

export const UserManagement: React.FC = () => {
  const { users, banUser, unbanUser, deleteUser, updateUserRole } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = (userId: string, role: UserRole) => {
    updateUserRole(userId, role);
    setShowRoleModal(false);
    setSelectedUser(null);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
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
          <h1 className="text-2xl font-bold text-white">用户管理</h1>
          <p className="text-gray-400 mt-1">共 {users.length} 位用户</p>
        </div>
      </div>

      <motion.section variants={itemVariants}>
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索用户名或邮箱..."
                className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">用户</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">邮箱</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">角色</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">学习时长</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">连续天数</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">注册时间</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const RoleIcon = roleIcons[user.role];
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-dark-border/50 hover:bg-dark-bg/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="font-medium text-white">{user.username}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${roleColors[user.role]}`}>
                          <RoleIcon className="w-3 h-3" />
                          {user.role === 'vip' ? 'VIP' : user.role === 'admin' ? '管理员' : '用户'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{formatTime(user.totalStudyTime)}</td>
                      <td className="py-3 px-4 text-gray-400">{user.streak} 天</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                          user.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {user.isActive ? "正常" : "已禁用"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{formatDate(user.createdAt)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowRoleModal(true);
                            }}
                            className="p-2 rounded-lg hover:bg-dark-bg text-gray-400 hover:text-white transition-colors"
                            title="修改角色"
                          >
                            <Shield className="w-4 h-4" />
                          </button>
                          {user.isActive ? (
                            <button
                              onClick={() => banUser(user.id)}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="禁用用户"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => unbanUser(user.id)}
                              className="p-2 rounded-lg hover:bg-green-500/10 text-gray-400 hover:text-green-400 transition-colors"
                              title="启用用户"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm("确定要删除此用户吗？")) {
                                deleteUser(user.id);
                              }
                            }}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                            title="删除用户"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.section>

      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">修改用户角色</h3>
            <p className="text-gray-400 mb-4">
              为用户 <span className="text-white">{selectedUser.username}</span> 选择新角色：
            </p>
            <div className="space-y-2">
              {(['user', 'vip', 'admin'] as UserRole[]).map((role) => {
                const RoleIcon = roleIcons[role];
                return (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(selectedUser.id, role)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedUser.role === role
                        ? "border-primary-500 bg-primary-500/20"
                        : "border-dark-border hover:border-gray-600"
                    }`}
                  >
                    <RoleIcon className={`w-5 h-5 ${roleColors[role].split(' ')[1]}`} />
                    <div className="text-left">
                      <p className="font-medium text-white">
                        {role === 'user' ? '普通用户' : role === 'vip' ? 'VIP用户' : '管理员'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {role === 'user' ? '基础学习权限' : role === 'vip' ? '高级课程访问权限' : '完整管理权限'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                }}
              >
                取消
              </Button>
            </div>
          </Card>
        </div>
      )}
    </motion.div>
  );
};
