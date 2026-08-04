"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./card.module.css";

interface MarqueeProps {
  text: string;
  hovered: boolean;
}

export default function Marquee({
  text,
  hovered,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);

  const offset = useRef(0);
  const lastTime = useRef(0);

  const speed = useRef(40); // px/sec
  const targetSpeed = useRef(40);

  const loopWidth = useRef(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (sequenceRef.current) {
        loopWidth.current = sequenceRef.current.offsetWidth;
      }
    };

    measure();

    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    targetSpeed.current = hovered ? 55 : 40;
  }, [hovered]);

  useEffect(() => {
    let frame: number;

    const animate = (time: number) => {
      if (!lastTime.current) {
        lastTime.current = time;
      }

      const delta = (time - lastTime.current) / 1000;
      lastTime.current = time;

      speed.current +=
        (targetSpeed.current - speed.current) * 0.08;

      offset.current -= speed.current * delta;

      if (loopWidth.current > 0) {
        while (offset.current <= -loopWidth.current) {
          offset.current += loopWidth.current;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform =
          `translate3d(${offset.current}px,0,0)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  const sequence = (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i}>{text}</span>
      ))}
    </>
  );

  return (
    <div className={styles.ticker}>
      <div ref={trackRef} className={styles.track}>
        <div
          ref={sequenceRef}
          style={{
            display: "flex",
          }}
        >
          {sequence}
        </div>

        <div
          style={{
            display: "flex",
          }}
        >
          {sequence}
        </div>
      </div>
    </div>
  );
}