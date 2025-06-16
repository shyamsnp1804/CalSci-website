import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { supabase } from "./configSupabase/config";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CodeEditor from "./pages/CodeEditor";
import AppCodeEditor from "./pages/dashboard/AppCodeEditor";

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-700">Loading...</div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/signin" replace />
                  )
                }
              />
              <Route
                path="/dashboard/code-editor/:macAddress"
                element={
                  isAuthenticated ? (
                    <AppCodeEditor />
                  ) : (
                    <Navigate to="/signin" replace />
                  )
                }
              />
              <Route path="/codeEditor" element={<CodeEditor />} />
              <Route
                path="/verify"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/signup" replace />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}