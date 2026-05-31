"use client";

import { motion } from "framer-motion";

export const AnalyticsChart = () => {
  return (
    <div className="w-full h-full flex items-end justify-between gap-2 p-2">
      {[40, 70, 45, 90, 60, 85, 100].map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
          className="w-full bg-gradient-to-t from-primary/40 to-primary rounded-t-sm"
        />
      ))}
    </div>
  );
};
