"use client";

import { useEffect, useRef } from "react";
import styles from "./cursor.module.css";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const position = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;

    const animate = () => {
      const size = 12;

      position.current.x +=
        (mouse.current.x - position.current.x) * 0.12;

      position.current.y +=
        (mouse.current.y - position.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;

        cursorRef.current.style.transform = `translate3d(${
          position.current.x - size / 2
        }px, ${position.current.y - size / 2}px, 0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div ref={cursorRef} className={styles.cursor} />;
}