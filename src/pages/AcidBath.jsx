import { useState, useEffect } from "react";
import { supabase } from "../configSupabase/config";
import {
  Phone,
  AlertCircle,
  X,
  Plus,
  Factory,
  Thermometer,
  Clock,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence, color } from "framer-motion";
import { Trash2 } from "lucide-react";
import { parse } from "date-fns";

export default function AcidBath() {
  const [rows, setRows] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [newPhone, setNewPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMac, setAlertMac] = useState("");
  const [alertTemp, setAlertTemp] = useState("");

  const [deviceInfoData, setDeviceInfoData] = useState([]);
  const [showDeviceInfoModal, setShowDeviceInfoModal] = useState(false);
  const [deviceInfoMac, setDeviceInfoMac] = useState("");
  const [deviceInfoText, setDeviceInfoText] = useState("");

  const [csvDate, setCsvDate] = useState("");

  const EDGE_FUNCTION_URL =
    "https://czxnvqwbwszzfgecpkbi.supabase.co/functions/v1/DSgroup";

  const fetchData = async () => {
    const { data: tempData } = await supabase
      .from("temperature_readings")
      .select("device_mac_address, temp_val, time_stamp");

    const { data: alertData } = await supabase
      .from("alert_thresholds")
      .select("device_mac_address, alert_temp");

    const { data: deviceInfoData } = await supabase
      .from("device_info")
      .select("device_mac_address, device_info");

    if (tempData && alertData && deviceInfoData) {
      const merged = tempData.map((reading) => {
        const match = alertData.find(
          (a) => a.device_mac_address === reading.device_mac_address
        );
        const matchInfo = deviceInfoData.find(
          (info) => info.device_mac_address === reading.device_mac_address
        );
        return {
          ...reading,
          alert_temp: match ? match.alert_temp : "—",
          device_info: matchInfo ? matchInfo.device_info : "—",
        };
      });
      setRows(merged);
    }
  };

  const addDeviceInfo = async () => {
    if (!deviceInfoMac.trim() || !deviceInfoText.trim()) return;
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "addDeviceInfo",
        device_mac_address: deviceInfoMac.trim(),
        device_info: deviceInfoText.trim(),
      }),
    });
    if (res.ok) {
      setDeviceInfoMac("");
      setDeviceInfoText("");
      setShowDeviceInfoModal(false);
      fetchData();
    } else {
      console.error("Failed to save device info");
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

  const deletePhoneNumber = async (number) => {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "deletePhoneNumber",
        phone_numbers: number,
      }),
    });
    if (res.ok) {
      fetchPhoneNumbers();
    } else {
      console.error("Failed to delete phone number");
    }
  };

  useEffect(() => {
    fetchData();
    fetchPhoneNumbers();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const fmtDate = (str) => {
    if (!str) return "—";

    // Parse "20/08/2025, 05:00:25 am" using date-fns
    const parsed = parse(str, "dd/MM/yyyy, hh:mm:ss a", new Date());
    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };
  const columns = [
    {
      title: "Slave Device",
      icon: <Factory size={16} color="#2563eb" strokeWidth={3} />,
    },
    {
      title: "Temperature (°C)",
      icon: <Thermometer size={16} color="#f97316" strokeWidth={3} />,
    },
    {
      title: "TimeStamp",
      icon: <Clock size={16} color="#22c55e" strokeWidth={3} />,
    },
    {
      title: "Alert Temp (°C)",
      icon: <Bell size={16} color="#dc2626" strokeWidth={3} />,
    },
  ];

  const downloadCSVForDate = async () => {
    if (!csvDate) return alert("Please select a date");

    const { data, error } = await supabase
      .from("temprecord")
      .select("temp_val, timestamp");

    if (error) {
      console.error(error);
      return;
    }

    // Parse csvDate (frontend) into numbers
    const [year, month, day] = csvDate.split("-").map(Number); // YYYY-MM-DD

    const filtered = data.filter((row) => {
      // Parse DB timestamp
      const [rowDate] = row.timestamp.split(","); // "20/8/2025"
      const [rowDay, rowMonth, rowYear] = rowDate.split("/").map(Number);
      return rowDay === day && rowMonth === month && rowYear === year;
    });

    if (!filtered.length) return alert("No data found for selected date");

    // Convert to CSV
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["temp_val,timestamp"]
        .concat(filtered.map((r) => `${r.temp_val},${r.timestamp}`))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `temperature_${csvDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 mt-20 max-w-5xl mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl shadow-lg">
          <Factory size={26} strokeWidth={2} />
          <span className="text-4xl font-extrabold tracking-wide">
            DS Group
          </span>
        </div>
      </div>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-slate-800">
        Temperature Readings
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-400">
              {columns.map((col) => (
                <th
                  key={col.title}
                  className="px-5 py-3 text-left text-sm font-semibold text-gray-900 "
                >
                  {col.icon}
                  {col.title}
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
                  <div className="text-sm text-gray-500">
                    {r.device_mac_address}
                  </div>
                  <div>{r.device_info ?? "—"}</div>
                  <button
                    onClick={() => {
                      setDeviceInfoMac(r.device_mac_address);
                      setShowDeviceInfoModal(true);
                    }}
                    className="text-blue-500 text-xs mt-1 hover:text-orange-700 hover:underline"
                  >
                    Add/Edit Info
                  </button>
                </td>
                <td className="px-5 py-3">{r.temp_val ?? "—"}</td>
                <td className="px-5 py-3">{fmtDate(r.time_stamp)}</td>
                <td className="px-5 py-3 font-semibold text-orange-600">
                  {r.alert_temp}
                  <button
                    onClick={() => {
                      setAlertMac(r.device_mac_address); // pre-fill MAC
                      setShowAlertModal(true);
                    }}
                    className="text-blue-500 text-xs mt-1 ml-2 hover:text-orange-700 hover:underline"
                  >
                    Add/Edit Alert
                  </button>
                </td>
              </tr>
            ))}

            {[...Array(1)].map((_, i) => (
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

        {/* <button
          onClick={() => setShowAlertModal(true)}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
          aria-label="Add Alert Temperature"
        >
          <AlertCircle size={20} />
          Add Alert Temperature
        </button> */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={csvDate}
            onChange={(e) => setCsvDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <button
            onClick={downloadCSVForDate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
          >
            Download CSV
          </button>
        </div>
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
                {phoneNumbers.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b py-2 px-3"
                  >
                    <span>{item.phone_numbers}</span>
                    <button
                      onClick={() => deletePhoneNumber(item.phone_numbers)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete phone number"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
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
      <AnimatePresence>
        {showDeviceInfoModal && (
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
                onClick={() => setShowDeviceInfoModal(false)}
                className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Add/Edit Device Info
              </h3>
              <input
                type="text"
                placeholder="Device MAC Address"
                value={deviceInfoMac}
                onChange={(e) => setDeviceInfoMac(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-3"
              />
              <input
                type="text"
                placeholder="Device Info"
                value={deviceInfoText}
                onChange={(e) => setDeviceInfoText(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
              <button
                onClick={addDeviceInfo}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
              >
                <Plus size={16} className="inline-block mr-1" />
                Save Device Info
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
