import { useEffect, useState } from "react";
import { supabase } from "../configSupabase/config";
import { motion } from "framer-motion";

export default function AcidBathView() {
  const [temp, setTemp] = useState(null);
  const THREAD_COUNT = 100;

  useEffect(() => {
    supabase
      .from("latest_temperature")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data, error }) => {
        if (error) console.error("Error fetching temperature:", error);
        else setTemp(data?.temp_c);
      });

    const channel = supabase
      .channel("realtime-temp")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "latest_temperature",
          filter: "id=eq.1",
        },
        (payload) => setTemp(payload.new.temp_c)
      )
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  const threads = Array.from({ length: THREAD_COUNT }).map((_, index) => (
    <motion.div
      key={index}
      className="absolute w-full h-[2px] bg-white"
      style={{
        top: `${(index * 100) / THREAD_COUNT}%`,
        opacity: 0.9,
        zIndex: 15,
      }}
      animate={{
        y: [0, -2, 0, 2, 0],
      }}
      transition={{
        duration: 2 + Math.random() * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 0.3,
      }}
    />
  ));

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="relative flex flex-col items-center">
        {/* 🔽 Tank container */}
        <div className="relative mt-10 w-[1000px] h-[600px]">
          {/* ✅ Acid bath tank */}
          <div
            className="w-full h-full bg-gray-800 border-t-[30px] border-l-[16px] border-r-[16px] border-b-[16px] border-gray-700 rounded-lg overflow-hidden shadow-2xl"
            style={{
              transform: "perspective(1200px) rotateX(45deg)",
              transformOrigin: "center bottom",
              borderTopColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* 🔸 Animated acid water */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/70 to-yellow-500/70"
              animate={{
                backgroundPosition: ["0% 50%", "200% 50%"],
                scale: [1, 1.01, 1],
              }}
              transition={{
                backgroundPosition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.3) 15%, transparent 25%, rgba(255,255,255,0.4) 35%, transparent 45%)",
                backgroundSize: "80px 100%",
                opacity: 0.75,
                zIndex: 10,
              }}
            />

            {/* 🔸 Threads */}
            {threads}

            {/* 🔸 Water surface wave */}
            <motion.div
              className="absolute top-0 left-0 w-full h-[80px] bg-yellow-400/50"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ zIndex: 12 }}
            />

            {/* 🔸 Base of tank */}
            <div className="absolute bottom-0 left-0 w-full h-[40px] bg-gray-600/80" />
          </div>

          {/* ✅ Temperature label in front of tank */}
          {temp !== null && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[-60px] text-white text-xl font-mono bg-black border border-yellow-400 px-6 py-2 rounded-md shadow-md z-50"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌡️ {temp.toFixed(1)} °C
            </motion.div>
          )}
        </div>

        {/* 🔽 Tank legs */}
        <div className="relative w-[1000px] h-[80px] flex justify-between mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-[30px] h-[80px] bg-gray-700 transform -translate-y-2"
              style={{ transform: "perspective(1200px) rotateX(45deg)" }}
            />
          ))}
        </div>

        {/* 🔽 Caption label */}
        <p className="mt-6 text-lg text-yellow-300 font-semibold tracking-wide">
          Acid Bath Simulation
        </p>
      </div>
    </div>
  );
}

