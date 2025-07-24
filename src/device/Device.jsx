import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "../configSupabase/config";
import { AuthContext } from "../context/AuthContext";
import AppList from "./AppList";
import AppCodeEditor from "./AppCodeEditor";
import AppCodePreview from "./AppCodePreview";
import AppUpdateModal from "./AppUpdateModal";
import AppDeleteModal from "./AppDeleteModal";

const Device = () => {
  const { macAddress } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState({
    showCreate: false,
    showPreview: false,
    showUpdate: false,
    showDelete: false,
    selectedApp: null,
  });

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          console.error("Device: No session found");
          setError("Unauthorized. Please sign in again.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from(`device_${macAddress}`)
          .select("app_name, description, status, file_path, is_downloaded");

        if (error) {
          console.error("Device: Error fetching apps:", error.message);
          setError(error.message);
          setLoading(false);
          return;
        }
        setApps(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Device: Fetch error:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApps();
  }, [macAddress]);

  const openCreateModal = () =>
    setModalState({ ...modalState, showCreate: true });
  const openPreviewModal = (appName) =>
    setModalState({ ...modalState, showPreview: true, selectedApp: appName });
  const openUpdateModal = (appName) =>
    setModalState({ ...modalState, showUpdate: true, selectedApp: appName });
  const openDeleteModal = (appName) =>
    setModalState({ ...modalState, showDelete: true, selectedApp: appName });
  const closeModal = () =>
    setModalState({
      showCreate: false,
      showPreview: false,
      showUpdate: false,
      showDelete: false,
      selectedApp: null,
    });

  const refreshApps = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(`device_${macAddress}`)
        .select("app_name, file_path, is_downloaded");

      if (error) {
        console.error("Device: Error refreshing apps:", error.message);
        setError(error.message);
      } else {
        setApps(data || []);
      }
    } catch (err) {
      console.error("Device: Refresh error:", err.message);
      setError(err.message);
    }
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-200 text-blue-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="mt-4 text-lg text-blue-700">Loading apps...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <AlertCircle className="w-12 h-12 text-red-600" />
            <p className="mt-4 text-lg text-red-600">Error: {error}</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-8">
              Manage Apps for Device {macAddress}
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
              <AppList
                macAddress={macAddress}
                apps={apps}
                onCreate={openCreateModal}
                onPreview={openPreviewModal}
                onUpdate={openUpdateModal}
                onDelete={openDeleteModal}
              />
            </div>
            {modalState.showCreate && (
              <AppCodeEditor
                macAddress={macAddress}
                onClose={closeModal}
                onSave={refreshApps}
              />
            )}
            {modalState.showPreview && (
              <AppCodePreview
                macAddress={macAddress}
                appName={modalState.selectedApp}
                onClose={closeModal}
              />
            )}
            {modalState.showUpdate && (
              <AppUpdateModal
                macAddress={macAddress}
                appName={modalState.selectedApp}
                onClose={closeModal}
                onUpdate={refreshApps}
              />
            )}
            {modalState.showDelete && (
              <AppDeleteModal
                macAddress={macAddress}
                appName={modalState.selectedApp}
                onClose={closeModal}
                onDelete={refreshApps}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Device;
