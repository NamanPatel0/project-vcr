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

  const targetSize = useRef(12);
  const currentSize = useRef(12);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as HTMLElement;

      if (target.closest(".card")) {
        targetSize.current = 42;
      } else {
        targetSize.current = 12;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frame: number;

    const animate = () => {
      position.current.x +=
        (mouse.current.x - position.current.x) * 0.14;

      position.current.y +=
        (mouse.current.y - position.current.y) * 0.14;

      currentSize.current +=
        (targetSize.current - currentSize.current) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.width = `${currentSize.current}px`;
        cursorRef.current.style.height = `${currentSize.current}px`;

        cursorRef.current.style.transform = `translate3d(
          ${position.current.x - currentSize.current / 2}px,
          ${position.current.y - currentSize.current / 2}px,
          0
        )`;
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={cursorRef} className={styles.cursor} />;
}