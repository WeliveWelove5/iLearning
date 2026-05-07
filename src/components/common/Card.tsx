import React from "react";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = true,
  glow = false,
  padding = "md",
  className = "",
  ...props
}) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`
        bg-dark-card rounded-2xl border border-dark-border
        ${paddings[padding]}
        ${hover ? "hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300" : ""}
        ${glow ? "shadow-lg shadow-primary-500/20 border-primary-500/30" : ""}
        ${className}
      `}
      onClick={props.onClick}
    >
      {children}
    </motion.div>
  );
};
