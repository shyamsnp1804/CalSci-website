import { useEffect, useState } from "react";
import { supabase } from "../configSupabase/config";

export default function AcidBath() {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    const { data: tempData, error: tempError } = await supabase
      .from("temperature_readings")
      .select("device_mac_address, temp_val, time_stamp")
      .order("time_stamp", { ascending: false });

    const { data: alertData, error: alertError } = await supabase
      .from("alert_thresholds")
      .select("device_mac_address, alert_temp");

    if (!tempError && !alertError && tempData && alertData) {
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

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60 * 1000);
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Device MAC
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Temperature (°C)
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Alert Temp (°C)
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {rows.map((r, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-mono text-gray-800">
                  {r.device_mac_address}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {r.temp_val ?? "—"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {fmtDate(r.time_stamp)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {r.alert_temp}
                </td>
              </tr>
            ))}

            {/* Dummy rows */}
            <tr>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
            </tr>
            <tr>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
            </tr>
            <tr>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
              <td className="px-4 py-6 text-sm text-gray-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
