import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useSidebarStore } from "../../stores/sidebarStore";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar />

      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
