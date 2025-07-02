import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../configSupabase/config";

const AppCodePreview = ({ macAddress, appName, onClose }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [codeLines, setCodeLines] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          console.error("AppCodePreview: No session found");
          throw new Error("Unauthorized");
        }

        const cleanMac = macAddress.toLowerCase().replace(/:/g, "");
        const { data, error } = await supabase
          .from(`device_${cleanMac}`)
          .select("app_name, file_path")
          .eq("app_name", appName)
          .single();

        if (error || !data) {
          console.error(
            "AppCodePreview: App fetch error:",
            error?.message || "App not found"
          );
          throw new Error(error?.message || "App not found");
        }

        const cacheBuster = new Date().getTime();
        const { data: fileData, error: fileError } = await supabase.storage
          .from("apps")
          .download(`${data.file_path}?cb=${cacheBuster}`);

        if (fileError) {
          console.error(
            "AppCodePreview: File download error:",
            fileError.message
          );
          throw new Error(`Failed to fetch code: ${fileError.message}`);
        }

        const codeText = await fileData.text();
        setCodeLines(codeText.split("\n"));
        setIsLoading(false);
      } catch (err) {
        console.error("AppCodePreview: Fetch error:", err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchCode();
  }, [macAddress, appName]);

  if (!isAuthenticated) {
    return null; // Handled by Device.jsx
  }

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-gray-100">Loading code...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-blue-300"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-200">
          <h2 className="text-lg font-semibold text-blue-800">
            Code Preview: {appName}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-600 hover:text-red-600"
            aria-label="Close"
          >
            <X size={24} />
          </motion.button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900 text-white rounded-b-xl font-mono text-sm">
          {codeLines.map((line, index) => (
            <div key={index} className="flex">
              <span className="text-gray-400 w-8 select-none pr-2 text-right">
                {index + 1}
              </span>
              <pre className="flex-1 text-white">{line || " "}</pre>
            </div>
          ))}
        </div>
        {error && (
          <motion.p
            className="text-red-600 p-4 text-center text-sm"
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

export default AppCodePreview;
