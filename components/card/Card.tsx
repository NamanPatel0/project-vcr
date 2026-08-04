"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Marquee from "./Marquee";
import styles from "./card.module.css";

interface CardProps {
  title: string;
  subtitle?: string;
  x: string;
  y: string;
  width: number;
  height: number;
  color: string;
  rotation: number;
  delay: number;
  variant?: "default" | "sticker";

  onClick?: () => void;
  selected?: boolean;
}

export default function Card({
  title,
  subtitle,
  x,
  y,
  width,
  height,
  color,
  rotation,
  delay,
  variant = "default",
  onClick,
  selected,
}: CardProps) {
  const isContact = !subtitle;
  const isSticker = variant === "sticker";

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      layoutId={isSticker ? "about-card" : undefined}
      data-card
      className={`
        ${styles.card}
        ${isContact ? styles.centered : ""}
        ${isSticker ? styles.sticker : ""}
      `}
      style={{
        left: x,
        top: y,
        width,
        height,
        rotate: `${rotation}deg`,
        boxShadow: `
          0 25px 60px rgba(0,0,0,.08),
          0 0 ${hovered ? 190 : 140}px ${color}
        `,
      }}
      initial={{
        opacity: 0,
        scale: 0.92,
        y: 30,
      }}
      animate={{
        opacity: 1,
        scale: hovered ? 1.035 : 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: {
          duration: 0.7,
          delay,
        },
        scale: {
          duration: 0.25,
        },
        y: {
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay,
        },
        layout: {
          duration: 0.8,
        },
      }}
      whileHover={{
        y: -10,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={isSticker ? onClick : undefined}
      whileTap={isSticker ? { scale: 0.985 } : undefined}
    >
      {isSticker ? (
        <>
          <div className={styles.stickerHeader}>
            <h2>Hello</h2>
            <p>my name is</p>
          </div>

          <div className={styles.stickerBody}>
            <h1>{title}</h1>
          </div>
        </>
      ) : (
        <div className={styles.content}>
          <h1>{title}</h1>
        </div>
      )}

      {subtitle && (
        <Marquee
          text={subtitle}
          hovered={hovered}
        />
      )}
    </motion.div>
  );
}