import React from "react";

import { motion } from "framer-motion";

const MediaPlayerLoading: React.FC = () => {
  return (
    <div className="w-full flex-1 bg-black items-center justify-center overflow-hidden flex">
      {/* Outer pulsing frame */}
      <motion.div
        initial={{ opacity: 0.4, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="relative w-[88%] aspect-video rounded-3xl border border-white/10 bg-[#020617] overflow-hidden"
      >
        {/* Shimmer sweep */}
        <motion.div
          initial={{ translateX: -80, opacity: 0.1 }}
          animate={{ translateX: 80, opacity: 0.35 }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
          }}
          style={{ height: "140%" }}
          className="absolute -left-10 -top-5 w-20 bg-white/10 rotate-12"
        />

        {/* Inner content skeleton */}
        <div className="flex flex-1 flex-col px-4 py-3 justify-between h-full">
          {/* Top controls bar */}
          <div className="flex flex-row items-center justify-between mb-3">
            <div className="flex flex-row items-center gap-2">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.7 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.08,
                }}
                className="w-7 h-7 rounded-full bg-white/10"
              />
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.7 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.16,
                }}
                className="w-10 h-4 rounded-full bg-white/10"
              />
            </div>
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.8 }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.22,
              }}
              className="w-8 h-8 rounded-full bg-white/10"
            />
          </div>

          {/* Center play-circle pulse */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={{ scale: 1.05, opacity: 0.9 }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-16 h-16 rounded-full bg-[#00D9FF]/20 flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0.4, translateX: -1 }}
                animate={{ opacity: 0.9, translateX: 1 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-8 h-8 rounded-full border-l-8 border-l-[#00D9FF] border-y-transparent border-r-transparent"
              />
            </motion.div>
          </div>

          {/* Bottom timeline + controls */}
          <div>
            <motion.div
              initial={{ opacity: 0.3, width: "50%" }}
              animate={{ opacity: 0.8, width: "90%" }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="h-1.5 rounded-full bg-white/10 mb-2"
            />
            <div className="flex flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.7 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-10 h-3 rounded-full bg-white/10"
              />
              <div className="flex flex-row items-center gap-2">
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 0.7 }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.08,
                  }}
                  className="w-4 h-4 rounded-full bg-white/10"
                />
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 0.7 }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.16,
                  }}
                  className="w-6 h-3 rounded-full bg-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MediaPlayerLoading;