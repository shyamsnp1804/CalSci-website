// import React, { useState, useContext, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import MacAddressForm from '../components/dashboard/MacAddressForm';
// import AppList from '../components/dashboard/AppList';
// import AppCreateButton from '../components/dashboard/AppCreateButton';
// import { handleMacAddress, getApps } from '../services/supabaseService';

// const Dashboard = () => {
//   const { isAuthenticated, loading } = useContext(AuthContext);
//   const [macAddress, setMacAddress] = useState('');
//   const [macError, setMacError] = useState('');
//   const [apps, setApps] = useState([]);
//   const [canCreateApp, setCanCreateApp] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/signin" replace />;
//   }

//   const handleMacSubmit = async (mac) => {
//     if (!mac) {
//       setMacError('Invalid MAC address format.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const { apps, canCreateApp } = await handleMacAddress(mac);
//       setMacAddress(mac);
//       setApps(apps);
//       setCanCreateApp(canCreateApp);
//       setMacError('');
//     } catch (error) {
//       setMacError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateAppClick = () => {
//     console.log('Create New App clicked'); // Placeholder for AppEditorModal
//   };

//   useEffect(() => {
//     if (macAddress) {
//       const fetchApps = async () => {
//         try {
//           const { apps, canCreateApp } = await getApps(macAddress);
//           setApps(apps);
//           setCanCreateApp(canCreateApp);
//         } catch (error) {
//           console.error('Error fetching apps:', error);
//         }
//       };
//       fetchApps();
//     }
//   }, [macAddress]);

//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-200 flex flex-col pt-16"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
//         <motion.h1
//           className="text-3xl sm:text-4xl font-semibold text-blue-800 mb-8 text-center"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           Dashboard
//         </motion.h1>
//         <MacAddressForm onSubmit={handleMacSubmit} error={macError} />
//         {isLoading ? (
//           <div className="text-center text-gray-700">Loading...</div>
//         ) : macAddress ? (
//           <>
//             <AppList apps={apps} />
//             <AppCreateButton
//               canCreateApp={canCreateApp}
//               onClick={handleCreateAppClick}
//             />
//           </>
//         ) : null}
//       </div>
//     </motion.div>
//   );
// };

// export default Dashboard;

import React from 'react'

function Dashboard() {
  return (
    <div>
      dashboard
    </div>
  )
}

export default Dashboard
