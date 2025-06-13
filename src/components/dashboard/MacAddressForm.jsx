import React from "react";
import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { useState } from "react";

function MacAddressForm() {
  const [macAddress, setMacAddress] = useState("");
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 w-full max-w-md border border-blue-200"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
        <Network size={24} /> Add MAC Address
      </h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          placeholder="e.g., 00AABB112255"
          className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-colors"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}

export default MacAddressForm;
