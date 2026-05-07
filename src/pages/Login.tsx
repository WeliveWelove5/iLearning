import React from "react";
import { useAuthStore } from "../stores/authStore";

export const Login: React.FC = () => {
  const { login } = useAuthStore();

  const handleLogin = () => {
    login("demo@example.com", "password");
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-white">L</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">LinguaFlow</h1>
          <p className="text-gray-400 mt-2">登录以继续学习</p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
          >
            登录演示账户
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            这是一个演示应用，点击上方按钮即可登录
          </p>
        </div>
      </div>
    </div>
  );
};
