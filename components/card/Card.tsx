"use client";

import { motion } from "framer-motion";

interface CardProps {
  title: string;
  x: string;
  y: string;
  width: number;
  height: number;
  color: string;
  rotation: number;
  delay: number;
}

export default function Card({
  title,
  x,
  y,
  width,
  height,
  color,
}: CardProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        background: color,
        borderRadius: 24,
      }}
    >
      <h1
        style={{
          padding: 24,
          margin: 0,
          fontSize: 32,
          color: "#222",
        }}
      >
        {title}
      </h1>
    </motion.div>
  );
}