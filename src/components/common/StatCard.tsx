import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "accent" | "success" | "warning";
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "primary",
  delay = 0,
}) => {
  const colors = {
    primary: "from-primary-500/20 to-primary-600/10 text-primary-400",
    accent: "from-accent-500/20 to-accent-600/10 text-accent-400",
    success: "from-green-500/20 to-green-600/10 text-green-400",
    warning: "from-orange-500/20 to-orange-600/10 text-orange-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-dark-card rounded-2xl border border-dark-border p-6 hover:border-primary-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
              <span>{trend.isPositive ? "↑" : "↓"} {trend.value}%</span>
              <span className="text-gray-500 ml-1">vs 上周</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};
