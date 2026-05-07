import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { Learn } from "./pages/Learn";
import { Community } from "./pages/Community";
import { Leaderboard } from "./pages/Leaderboard";
import { Profile } from "./pages/Profile";
import { useAuthStore } from "./stores/authStore";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Courses />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Learn />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/:type"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Learn />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Community />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Leaderboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
