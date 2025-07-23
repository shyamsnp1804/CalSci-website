import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signInUser } from "../configSupabase/auth";
import { supabase } from "../configSupabase/config";

const SignIn = () => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-200 text-blue-900">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LogIn className="w-12 h-12 text-blue-600 animate-pulse" />
          <p className="mt-4 text-lg text-blue-700">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/device/add" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const result = await signInUser(email, password);
      if (!result.success) {
        throw new Error(result.message);
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) {
        throw new Error(`Failed to retrieve session: ${sessionError.message}`);
      }

      if (!session?.user) {
        throw new Error("No user data found in session");
      }

      const { data, error } = await supabase
        .from("macaddresses")
        .select("mac_address")
        .eq("user_id", session.user.id)
        .limit(1);

      if (error) {
        console.error("SignIn: Error fetching devices:", error.message);
        navigate("/device/add", { replace: true });
      } else if (data && data.length > 0) {
        navigate(`/device/${data[0].mac_address}`, { replace: true });
      } else {
        navigate("/device/add", { replace: true });
      }

      setMessage("Sign in successful!");
      setIsSuccess(true);
    } catch (error) {
      console.error("SignIn: Error:", error.message);
      setMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-200 text-blue-900 flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-lg border border-blue-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 flex items-center justify-center gap-2">
            <LogIn className="w-8 h-8 text-blue-600" />
            Welcome Back
          </h1>
          <p className="mt-2 text-lg text-blue-700">
            Sign in to access your CalSci IoT platform
          </p>
        </motion.div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <motion.div variants={itemVariants} className="relative">
            <Mail className="absolute top-3 left-3 text-blue-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <Lock className="absolute top-3 left-3 text-blue-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            type="submit"
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white font-medium shadow-md transition-colors ${
              isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isSubmitting}
          >
            <LogIn className="w-5 h-5" />
            {isSubmitting ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>

        {message && (
          <motion.p
            variants={itemVariants}
            className={`text-sm text-center mt-4 ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </motion.p>
        )}

        <motion.p
          variants={itemVariants}
          className="text-sm text-center text-blue-800 mt-6"
        >
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignIn;