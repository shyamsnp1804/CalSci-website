import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { supabase } from "./configSupabase/config";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CodeEditor from "./pages/CodeEditor";
import Device from "./device/Device";
import AddDevice from "./device/AddDevice";
import NotFound from "./pages/NotFound";

const RedirectAfterLogin = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      console.log('RedirectAfterLogin: Not authenticated, redirecting to /signin');
      navigate('/signin', { replace: true });
      return;
    }

    const checkDevices = async () => {
      try {
        console.log('RedirectAfterLogin: Checking devices for userId=', user.id);
        const { data, error } = await supabase
          .from('macaddresses')
          .select('mac_address')
          .eq('user_id', user.id)
          .limit(1);

        if (error) {
          console.error('RedirectAfterLogin: Error fetching devices:', error.message);
          navigate('/device/add', { replace: true });
          return;
        }

        if (data && data.length > 0) {
          console.log('RedirectAfterLogin: Found macAddress=', data[0].mac_address);
          navigate(`/device/${data[0].mac_address}`, { replace: true });
        } else {
          console.log('RedirectAfterLogin: No devices found');
          navigate('/device/add', { replace: true });
        }
      } catch (err) {
        console.error('RedirectAfterLogin: Fetch error:', err.message);
        navigate('/device/add', { replace: true });
      }
    };

    checkDevices();
  }, [isAuthenticated, user, navigate]);

  return <div className="min-h-screen flex items-center justify-center text-gray-700">Redirecting...</div>;
};

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
            <Route path="/" element={isAuthenticated ? <RedirectAfterLogin /> : <Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/codeEditor" element={<CodeEditor />} />

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