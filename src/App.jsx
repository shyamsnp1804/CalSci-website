import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthContext, AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CodeEditor from "./pages/CodeEditor";
import Device from "./device/Device";
import AddDevice from "./device/AddDevice";
import NotFound from "./pages/NotFound";
import DisplayPage from "./pages/DisplayPages";
import AcidBath from "./pages/AcidBath";
// import AppStore from "./pages/AppStore";

const SPECIAL_EMAILS = ["contact@calsci.io"];

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (isAuthenticated && SPECIAL_EMAILS.includes(user?.email)) {
    return (
      <Routes>
        <Route path="/acidbath" element={<AcidBath />} />
        <Route path="*" element={<Navigate to="/acidbath" replace />} />
      </Routes>
    );
  }
  // If the user is the special email, ONLY show AcidBath
  if (isAuthenticated && user?.email === SPECIAL_EMAILS) {
    return (
      <Routes>
        <Route path="/acidbath" element={<AcidBath />} />
        <Route path="*" element={<Navigate to="/acidbath" replace />} />
      </Routes>
    );
  }

  // Normal app for all other users
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/codeEditor" element={<CodeEditor />} />
            <Route path="/display" element={<DisplayPage />} />
            {/* <Route path="/acidbath" element={<AcidBath />} /> */}
            {/* <Route path="/appstore" element={<AppStore />} /> */}

            {/* Protected Routes */}
            <Route
              path="/device/add"
              element={
                isAuthenticated ? (
                  <AddDevice />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/device/:macAddress"
              element={
                isAuthenticated ? <Device /> : <Navigate to="/signin" replace />
              }
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
