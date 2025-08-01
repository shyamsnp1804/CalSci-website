import { useEffect, useState } from "react";
import { supabase } from "../configSupabase/config";

export default function AcidBath() {
  const [temperature, setTemperature] = useState(null);

  const fetchTemperature = async () => {
    const { data, error } = await supabase
      .from("latest_temperature")
      .select("temp_c")
      .single();

    if (error) {
      console.error("Error fetching temperature:", error.message);
    } else {
      setTemperature(data.temp_c);
    }
  };

  useEffect(() => {
    fetchTemperature();
    const interval = setInterval(() => {
      fetchTemperature();
    }, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-15 text-center">
      <h1 className="text-2xl font-bold mb-4">Acid Bath Temperature</h1>
      <p className="text-xl">
        Current Temperature:{" "}
        <span className="font-semibold text-red-600">
          {temperature !== null ? `${temperature} °C` : "Loading..."}
        </span>
      </p>
    </div>
  );
}
