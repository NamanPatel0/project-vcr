"use client";

import { motion } from "framer-motion";

function Glow({
  className,
  duration,
}: {
  className: string;
  duration: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, 25, -20, 0],
        y: [0, -20, 15, 0],
        scale: [1, 1.05, 0.97, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#F8F6F3]">
      <Glow
        duration={22}
        className="absolute left-[4%] top-[8%] h-[520px] w-[520px] rounded-full bg-emerald-200/30 blur-[140px]"
      />

      <Glow
        duration={28}
        className="absolute right-[6%] top-[12%] h-[450px] w-[450px] rounded-full bg-sky-200/30 blur-[140px]"
      />

      <Glow
        duration={34}
        className="absolute bottom-[4%] left-[28%] h-[560px] w-[560px] rounded-full bg-violet-200/25 blur-[160px]"
      />

      <Glow
        duration={26}
        className="absolute bottom-[10%] right-[18%] h-[420px] w-[420px] rounded-full bg-orange-100/25 blur-[120px]"
      />
    </div>
  );
}