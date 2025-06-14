import React from 'react';
import { motion } from 'framer-motion';

const AppList = ({ macAddress, apps }) => {
  if (!macAddress) return null;

  return (
    <motion.div
      className="mt-6 w-full max-w-4xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-blue-800 mb-2">Apps for Device: {macAddress}</h3>
      {apps.length > 0 ? (
        <table className="w-full bg-white/90 rounded-lg shadow-lg border border-blue-200">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-left text-blue-800">ID</th>
              <th className="p-3 text-left text-blue-800">App Name</th>
              <th className="p-3 text-left text-blue-800">Code</th>
              <th className="p-3 text-left text-blue-800">Downloaded</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app, index) => (
              <tr key={index} className="border-t border-blue-200">
                <td className="p-3 text-gray-800">{app.id}</td>
                <td className="p-3 text-gray-800">{app.app_name}</td>
                <td className="p-3 text-gray-800 truncate max-w-xs">{app.code}</td>
                <td className="p-3 text-gray-800">{app.is_downloaded ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center">No apps found for this device.</p>
      )}
    </motion.div>
  );
};

export default AppList;