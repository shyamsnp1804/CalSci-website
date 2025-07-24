import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CodeEditor from "./pages/CodeEditor";
import Device from "./device/Device";
import AddDevice from "./device/AddDevice";
import NotFound from "./pages/NotFound";
import DisplayPage from "./pages/DisplayPages";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AppStore from "./pages/AppStore";

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/codeEditor" element={<CodeEditor />} />
             <Route path="/display" element={<DisplayPage />} />
              <Route path="/about" element={<About/>} />
               <Route path="/contact" element={<Contact />} />
            <Route path="/appstore" element={<AppStore />} />

            {/* Protected Routes */}
            <Route
              path="/device/add"
              element={isAuthenticated ? <AddDevice /> : <Navigate to="/signin" replace />}
            />
            <Route
              path="/device/:macAddress"
              element={isAuthenticated ? <Device /> : <Navigate to="/signin" replace />}
            />
            <Route
              path="/verify"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signup" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
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