import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../configSupabase/config";

const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_CREATE_TABLE;

const AddDevice = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [macAddress, setMacAddress] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading)
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-gray-100">Loading...</div>
      </div>
    );
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const cleanMac = macAddress.replace(/[^a-fA-F0-9]/g, "").toLowerCase();

    if (!cleanMac || !/^[a-f0-9]{12}$/.test(cleanMac)) {
      setError(
        "Invalid MAC address: must be 12 hexadecimal characters (e.g., 00AABBCCDDEE)"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setError("Unauthorized. Please sign in again.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ macAddress: cleanMac }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Failed to add device (Status: ${response.status})`
        );
      }

      setError("");
      setMacAddress("");
      navigate(`/device/${cleanMac}`);
    } catch (err) {
      console.error("AddDevice: Fetch error:", err.message);
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 w-full max-w-md border border-blue-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <Network size={24} /> Add Device MacAddress
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={macAddress}
            onChange={(e) => setMacAddress(e.target.value)}
            placeholder="e.g., 00AABBCCDDEE"
            className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Adding Device..." : "Add Device"}
          </motion.button>
        </form>
        {error && (
          <motion.p
            className="text-red-600 mt-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AddDevice;
