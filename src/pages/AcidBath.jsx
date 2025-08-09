import { useState, useEffect } from "react";
import { supabase } from "../configSupabase/config";

export default function AcidBath() {
  const [rows, setRows] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [newPhone, setNewPhone] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    if (!newPhone) return;
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "addPhoneNumber",
        phone_numbers: newPhone,
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

  useEffect(() => {
    fetchData();
    fetchPhoneNumbers();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fmtDate = (iso) => (iso ? new Date(iso).toLocaleString() : "—");

  return (
    <div className="p-4 mt-20 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Temperature Readings
      </h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">Device MAC</th>
              <th className="px-4 py-3">Temperature (°C)</th>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Alert Temp (°C)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {rows.map((r, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">{r.device_mac_address}</td>
                <td className="px-4 py-3">{r.temp_val ?? "—"}</td>
                <td className="px-4 py-3">{fmtDate(r.time_stamp)}</td>
                <td className="px-4 py-3">{r.alert_temp}</td>
              </tr>
            ))}

            {[...Array(3)].map((_, i) => (
              <tr key={`dummy-${i}`}>
                <td className="px-4 py-6 text-gray-400">—</td>
                <td className="px-4 py-6 text-gray-400">—</td>
                <td className="px-4 py-6 text-gray-400">—</td>
                <td className="px-4 py-6 text-gray-400">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowModal(true)}
        >
          Manage Phone Numbers
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Phone Numbers</h3>
            <ul className="mb-4">
              {phoneNumbers.map((p, idx) => (
                <li key={idx} className="border-b py-1">
                  {p.phone_numbers}
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Enter phone number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={addPhoneNumber}
            >
              Add Phone Number
            </button>
            <button
              className="ml-2 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
