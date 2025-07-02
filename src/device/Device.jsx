import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
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
          .select("app_name, file_path, is_downloaded");

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

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <AppList
          macAddress={macAddress}
          apps={apps}
          onCreate={openCreateModal}
          onPreview={openPreviewModal}
          onUpdate={openUpdateModal}
          onDelete={openDeleteModal}
        />
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
      </div>
    </div>
  );
};

export default Device;
