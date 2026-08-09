"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Marquee from "./Marquee";
import CameraHUD from "./CameraHUD";
import TerminalHUD from "./TerminalHUD";
import StickyNote from "./StickyNote";

import styles from "./card.module.css";

interface CardProps {
  id: string;

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
}

export default function Card({
  id,

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
}: CardProps) {
  const isSticker = variant === "sticker";

  const isWork = id === "work";
  const isProjects = id === "projects";
  const isContact = id === "contact";

  const glowColor =
    id === "me"
      ? "rgba(255,106,95,.45)"
      : id === "work"
      ? "rgba(0,0,0,.22)"
      : id === "projects"
      ? "rgba(1,36,86,.5)"
      : id === "contact"
      ? "rgba(255,205,70,.5)"
      : color;

  const [hovered, setHovered] = useState(false);

  const router = useRouter();

  return (
    <motion.div
      layout
      layoutId={
        isSticker
          ? "about-card"
          : undefined
      }

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

        zIndex: 1,

        backgroundColor:
          isSticker
            ? "#faf7f2"
            : color,

        boxShadow: `
          0 25px 60px rgba(0,0,0,.08),
          0 0 ${hovered ? 190 : 140}px ${glowColor}
        `,
      }}

      initial={{
        opacity: 0,
        scale: 0.92,
        y: 30,
      }}

      animate={{
        opacity: 1,
        scale: hovered
          ? 1.035
          : 1,

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
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        },
      }}

      whileHover={{
        y: -10,
      }}

      onHoverStart={() =>
        setHovered(true)
      }

      onHoverEnd={() =>
        setHovered(false)
      }

      onClick={() => {
        if (isSticker) {
          router.push("/about");
        }

        onClick?.();
      }}
    >

      {isSticker ? (
        <>
          <motion.div
            layoutId="hello-section"
            className={styles.redMorph}
          >
            <h2>Hello</h2>

            <p>my name is</p>
          </motion.div>

          <div className={styles.stickerBody}>

            <motion.h1
              layoutId="name-text"
            >
              {title}
            </motion.h1>

          </div>

          {subtitle && (
            <div className={styles.cardTicker}>

              <Marquee
                text={subtitle}
                hovered={hovered}
              />

            </div>
          )}
        </>

      ) : (

        <>
          <div className={styles.content}>

            {isWork && (
              <>
                <CameraHUD />

                <h1>
                  {title}
                </h1>
              </>
            )}

            {isProjects && (
              <TerminalHUD />
            )}

            {isContact && (
              <StickyNote />
            )}

            {!isWork &&
              !isProjects &&
              !isContact && (
                <h1>
                  {title}
                </h1>
              )}

          </div>

          {subtitle &&
            !isProjects &&
            !isContact && (

              <div
                className={
                  isWork
                    ? styles.workTicker
                    : styles.cardTicker
                }
              >

                <Marquee
                  text={subtitle}
                  hovered={hovered}
                />

              </div>

            )}

        </>

      )}

    </motion.div>
  );
}