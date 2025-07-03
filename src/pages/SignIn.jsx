import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signInUser } from "../configSupabase/auth";
import { Link } from "react-router-dom";
import { supabase } from "../configSupabase/config";

function SignIn() {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading...
      </div>
    );
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 to-sky-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-gradient-to-br from-violet-200 to-sky-300 p-8 rounded-2xl shadow-xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-center text-gray-800 mb-2"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-center text-gray-500 mb-6"
        >
          Sign in to your account
        </motion.p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Mail className="absolute top-2.5 left-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <Lock className="absolute top-2.5 left-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className={`w-full py-2 rounded-md text-white transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`text-sm text-center mt-4 ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-center text-gray-600 mt-5"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default SignIn;
