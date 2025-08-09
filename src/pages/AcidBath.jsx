import { useState, useEffect } from "react";
import { supabase } from "../configSupabase/config";
import { Phone, AlertCircle, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AcidBath() {
  const [rows, setRows] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [newPhone, setNewPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMac, setAlertMac] = useState("");
  const [alertTemp, setAlertTemp] = useState("");

  const EDGE_FUNCTION_URL =
    "https://czxnvqwbwszzfgecpkbi.supabase.co/functions/v1/DSgroup";

  const fetchData = async () => {
    const { data: tempData } = await supabase
      .from("temperature_readings")
      .select("device_mac_address, temp_val, time_stamp");

    const { data: alertData } = await supabase
      .from("alert_thresholds")
      .select("device_mac_address, alert_temp");

    if (tempData && alertData) {
      const merged = tempData.map((reading) => {
        const match = alertData.find(
          (a) => a.device_mac_address === reading.device_mac_address
        );
        return {
          ...reading,
          alert_temp: match ? match.alert_temp : "—",
        };
      });
      setRows(merged);
    }
  };

  const addPhoneNumber = async () => {
    if (!newPhone.trim()) return;
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "addPhoneNumber",
        phone_numbers: newPhone.trim(),
      }),
    });
    if (res.ok) {
      setNewPhone("");
      fetchPhoneNumbers();
    } else {
      console.error("Failed to add phone number");
    }
  };

  const fetchPhoneNumbers = async () => {
    const { data } = await supabase
      .from("user_phone_numbers")
      .select("phone_numbers");
    if (data) setPhoneNumbers(data);
  };

  const addAlertThreshold = async () => {
    if (!alertMac.trim() || !alertTemp) return;
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "addAlertTemp",
        device_mac_address: alertMac.trim(),
        alert_temp: parseFloat(alertTemp),
      }),
    });
    if (res.ok) {
      setAlertMac("");
      setAlertTemp("");
      setShowAlertModal(false);
      fetchData();
    } else {
      console.error("Failed to add alert threshold");
    }
  };

  useEffect(() => {
    fetchData();
    fetchPhoneNumbers();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const fmtDate = (iso) => (iso ? new Date(iso).toLocaleString() : "—");

  return (
    <div className="p-4 mt-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-800">
        Temperature Readings
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Device MAC",
                "Temperature (°C)",
                "Timestamp",
                "Alert Temp (°C)",
              ].map((title) => (
                <th
                  key={title}
                  className="px-5 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rows.map((r, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-5 py-3 font-mono text-gray-900">
                  {r.device_mac_address}
                </td>
                <td className="px-5 py-3">{r.temp_val ?? "—"}</td>
                <td className="px-5 py-3">{fmtDate(r.time_stamp)}</td>
                <td className="px-5 py-3 font-semibold text-orange-600">
                  {r.alert_temp}
                </td>
              </tr>
            ))}

            {[...Array(3)].map((_, i) => (
              <tr key={`dummy-${i}`}>
                <td className="px-5 py-6 text-gray-300">—</td>
                <td className="px-5 py-6 text-gray-300">—</td>
                <td className="px-5 py-6 text-gray-300">—</td>
                <td className="px-5 py-6 text-gray-300">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
          aria-label="Manage Phone Numbers"
        >
          <Phone size={20} />
          Manage Phone Numbers
        </button>

        <button
          onClick={() => setShowAlertModal(true)}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
          aria-label="Add Alert Temperature"
        >
          <AlertCircle size={20} />
          Add Alert Temperature
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0  bg-black bg-opacity-20 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 focus:outline-none"
                aria-label="Close Phone Numbers Modal"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Phone size={24} />
                Phone Numbers
              </h3>
              <ul className="mb-4 max-h-48 overflow-auto border border-gray-200 rounded-md p-3 space-y-1">
                {phoneNumbers.map((p, idx) => (
                  <li
                    key={idx}
                    className="border-b border-gray-200 last:border-none py-1 text-gray-700"
                  >
                    {p.phone_numbers}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Enter phone number"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addPhoneNumber}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
              >
                <Plus size={16} className="inline-block mr-1" />
                Add Phone Number
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAlertModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowAlertModal(false)}
                className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 focus:outline-none"
                aria-label="Close Alert Temperature Modal"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <AlertCircle size={24} />
                Add Alert Temperature
              </h3>
              <input
                type="text"
                placeholder="Device MAC Address"
                value={alertMac}
                onChange={(e) => setAlertMac(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="number"
                placeholder="Alert Temperature (°C)"
                value={alertTemp}
                onChange={(e) => setAlertTemp(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={addAlertThreshold}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
              >
                <Plus size={16} className="inline-block mr-1" />
                Save Alert Temperature
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
