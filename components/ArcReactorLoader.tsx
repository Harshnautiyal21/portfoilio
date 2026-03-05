"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ArcReactorLoaderProps {
  onComplete: () => void;
}

const FULL_TEXT = "INITIALIZING JARVIS...";
const DISMISS_DELAY = 2600;

export default function ArcReactorLoader({ onComplete }: ArcReactorLoaderProps) {
  const [typedText, setTypedText] = useState("");
  const [showCore, setShowCore] = useState(false);
  const [showSystem, setShowSystem] = useState(false);

  useEffect(() => {
    // Typing effect
    let charIdx = 0;
    const typingInterval = setInterval(() => {
      charIdx += 1;
      setTypedText(FULL_TEXT.slice(0, charIdx));
      if (charIdx >= FULL_TEXT.length) clearInterval(typingInterval);
    }, 70);

    const coreTimer = setTimeout(() => setShowCore(true), 400);
    const systemTimer = setTimeout(() => setShowSystem(true), 1400);
    const dismissTimer = setTimeout(() => onComplete(), DISMISS_DELAY);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(coreTimer);
      clearTimeout(systemTimer);
      clearTimeout(dismissTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712]">
      {/* Arc Reactor */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
        {/* Concentric border rings */}
        {([1, 2, 3, 4] as const).map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full"
            style={{
              width: ring * 48,
              height: ring * 48,
              border: "1px solid rgba(0,212,255,0.35)",
              boxShadow: `0 0 ${ring * 6}px rgba(0,212,255,${0.25 - ring * 0.04})`,
            }}
            animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 3 + ring, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Bright spinning arc segments */}
        {([1, 2] as const).map((seg) => (
          <motion.div
            key={`arc-${seg}`}
            className="absolute rounded-full"
            style={{
              width: seg * 96,
              height: seg * 96,
              border: "2px solid transparent",
              borderTopColor: "#00D4FF",
              borderRightColor: seg === 1 ? "#00D4FF" : "transparent",
              filter: "drop-shadow(0 0 4px #00D4FF)",
            }}
            animate={{ rotate: seg === 1 ? 360 : -360 }}
            transition={{ duration: 1.4 + seg * 0.4, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Energy core */}
        <AnimatePresence>
          {showCore && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: 60,
                height: 60,
                background: "radial-gradient(circle, #ffffff 0%, #00D4FF 45%, #0060ff 100%)",
                boxShadow: "0 0 24px #00D4FF, 0 0 48px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.25)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full bg-white"
                style={{ width: 22, height: 22, boxShadow: "0 0 16px white" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Typing text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-10 text-cyan-400 tracking-[0.3em] text-sm"
        style={{ fontFamily: "monospace" }}
      >
        {typedText}
        <span className="animate-pulse">_</span>
      </motion.p>

      <AnimatePresence>
        {showSystem && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 font-orbitron text-xs text-cyan-400/50 tracking-[0.4em] uppercase"
          >
            SYSTEM ONLINE
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
