import React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

const AppList = ({
  macAddress,
  apps,
  onCreate,
  onPreview,
  onUpdate,
  onDelete,
}) => {
  if (!macAddress) {
    return (
      <div className="text-center text-red-600">Error: Invalid device</div>
    );
  }

  // Enable "Make App" if no apps exist or all apps are downloaded
  const canMakeApp =
    apps.length === 0 || apps.every((app) => app.is_downloaded);

  return (
    <motion.div
      className="mt-6 w-full max-w-4xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-blue-800 mb-2">
        Apps for Device: {macAddress}
      </h3>
      {apps.length > 0 ? (
        <table className="w-full bg-white/90 rounded-lg shadow-lg border border-blue-200">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-left text-blue-800">App Name</th>
              <th className="p-3 text-left text-blue-800">is_Downloaded</th>
              <th className="p-3 text-left text-blue-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app, index) => (
              <tr key={index} className="border-t border-blue-200">
                <td className="p-3">
                  <button
                    onClick={() => onPreview(app.app_name)}
                    className="text-blue-600 hover:underline hover:cursor-pointer hover:text-blue-900"
                  >
                    {app.app_name}
                  </button>
                </td>
                <td className="p-3 text-gray-800">
                  {app.is_downloaded ? "Yes" : "No"}
                </td>
                <td className="p-3 flex gap-5">
                  <button
                    onClick={() => onUpdate(app.app_name)}
                    className="text-yellow-600 hover:text-yellow-900 hover:cursor-pointer"
                    title="Update App"
                  >
                    <Edit2 size={22} />
                  </button>
                  <button
                    onClick={() => onDelete(app.app_name)}
                    className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                    title="Delete App"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center">
          No apps found for this device.
        </p>
      )}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreate}
          disabled={!canMakeApp}
          className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors ${
            !canMakeApp
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-blue-600 hover:to-purple-700"
          }`}
        >
          Make App
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AppList;
