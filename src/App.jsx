import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CodeEditor from './pages/CodeEditor';

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center text-gray-700">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path='/codeEditor' element={<CodeEditor />} />
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