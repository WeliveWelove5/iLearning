import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { Button } from "../components/common/Button";
import type { Language } from "../types";

const languages = [
  { value: "english", label: "英语", flag: "🇬🇧" },
  { value: "japanese", label: "日语", flag: "🇯🇵" },
  { value: "korean", label: "韩语", flag: "🇰🇷" },
];

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    targetLanguage: "english" as Language,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.username || !formData.password) {
      setError("请填写所有必填项");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    if (formData.password.length < 6) {
      setError("密码长度至少为6位");
      return;
    }

    try {
      await register({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        targetLanguage: formData.targetLanguage,
      });
      navigate("/");
    } catch (err) {
      setError("注册失败，请稍后重试");
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-white">L</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">LinguaFlow</h1>
          <p className="text-gray-400 mt-2">创建您的学习账户</p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                邮箱地址
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                用户名
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                placeholder="您的昵称"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                目标语言
              </label>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, targetLanguage: lang.value as Language })}
                    className={`p-3 rounded-xl border transition-all ${
                      formData.targetLanguage === lang.value
                        ? "border-primary-500 bg-primary-500/20 text-white"
                        : "border-dark-border bg-dark-bg text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="block text-sm mt-1">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                密码
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                placeholder="至少6位字符"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                确认密码
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                placeholder="再次输入密码"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3"
              isLoading={isLoading}
            >
              注册账户
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              已有账户？{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary-400 hover:text-primary-300"
              >
                立即登录
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
