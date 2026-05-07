import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { Button } from "../components/common/Button";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');

  const handleLogin = async () => {
    await login("demo@example.com", "password");
    navigate("/");
  };

  const handleAdminLogin = async () => {
    await login("admin@linguaflow.com", "admin123");
    navigate("/admin");
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
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginType('user')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                loginType === 'user'
                  ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              用户登录
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                loginType === 'admin'
                  ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              管理员登录
            </button>
          </div>

          {loginType === 'user' ? (
            <>
              <Button
                onClick={handleLogin}
                className="w-full py-3"
                isLoading={isLoading}
              >
                登录演示账户
              </Button>
              <p className="text-center text-gray-500 text-sm mt-4">
                还没有账户？{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-primary-400 hover:text-primary-300"
                >
                  立即注册
                </button>
              </p>
            </>
          ) : (
            <Button
              onClick={handleAdminLogin}
              className="w-full py-3"
              isLoading={isLoading}
            >
              登录管理员账户
            </Button>
          )}

          <p className="text-center text-gray-500 text-sm mt-6">
            这是一个演示应用，点击上方按钮即可登录
          </p>
        </div>
      </div>
    </div>
  );
};
