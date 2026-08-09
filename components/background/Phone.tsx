"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./phone.module.css";

function FingerprintScanner() {
  const [failed, setFailed] = useState(false);

  const triggerFailure = () => {
    setFailed(false);

    requestAnimationFrame(() => {
      setFailed(true);
    });

    setTimeout(() => {
      setFailed(false);
    }, 900);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.fingerprintButton} ${
          failed ? styles.fingerprintFailed : ""
        }`}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          triggerFailure();
        }}
        aria-label="Fingerprint scanner"
      >
        <span className={styles.fingerprintIcon}>◉</span>
      </button>

      {failed && (
        <span className={styles.fingerprintError}>
          Fingerprint not recognized
        </span>
      )}
    </>
  );
}

export default function Phone() {
  const [time, setTime] = useState(new Date());
  const [shadeOpen, setShadeOpen] = useState(false);
  const [shadeDragging, setShadeDragging] = useState(false);
  const [shadeProgress, setShadeProgress] = useState(0);

  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [flashlight, setFlashlight] = useState(false);

  const dragStartY = useRef(0);
  const dragStartProgress = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();

  // Always show two digits: 08, 09, 10, 11, etc.
  const hour = (hours % 12 || 12).toString().padStart(2, "0");
  const minute = minutes.toString().padStart(2, "0");

  const date = time.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const openShade = () => {
    setShadeOpen(true);
    setShadeProgress(1);
  };

  const closeShade = () => {
    setShadeOpen(false);
    setShadeProgress(0);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 15) {
      openShade();
    } else if (event.deltaY < -15 && shadeOpen) {
      closeShade();
    }
  };

  const handleScreenPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (shadeOpen) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const localY = event.clientY - rect.top;

    if (localY > 100) return;

    dragStartY.current = event.clientY;
    dragStartProgress.current = 0;

    setShadeDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleScreenPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!shadeDragging || shadeOpen) return;

    const distance = event.clientY - dragStartY.current;

    if (distance <= 0) {
      setShadeProgress(0);
      return;
    }

    setShadeProgress(Math.min(1, distance / 260));
  };

  const handleShadePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    dragStartY.current = event.clientY;
    dragStartProgress.current = shadeProgress;

    setShadeDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleShadePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!shadeDragging) return;

    const distance = event.clientY - dragStartY.current;
    const progressChange = distance / 260;

    const nextProgress = Math.max(
      0,
      Math.min(1, dragStartProgress.current + progressChange)
    );

    setShadeProgress(nextProgress);
  };

  const finishShadeDrag = () => {
    if (!shadeDragging) return;

    setShadeDragging(false);

    if (shadeProgress >= 0.35) {
      openShade();
    } else {
      closeShade();
    }
  };

  const stopPropagation = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.phone}>
      <div
        className={styles.screen}
        onWheel={handleWheel}
        onPointerDown={handleScreenPointerDown}
        onPointerMove={handleScreenPointerMove}
        onPointerUp={finishShadeDrag}
        onPointerCancel={finishShadeDrag}
      >
        <div className={styles.dynamicIsland} />

        <div className={styles.statusBar}>
          <span className={styles.carrier}>Naman</span>

          <div className={styles.statusIcons}>
            <span>{wifi ? "●" : "○"}</span>
            <span>{bluetooth ? "●" : "○"}</span>
            <span>▰</span>
          </div>
        </div>

        <div className={styles.lockScreenClock}>
          <div className={styles.time}>
            <span className={styles.hour}>{hour}</span>
            <span className={styles.minute}>{minute}</span>
          </div>

          <div className={styles.date}>{date}</div>
          <div className={styles.weather}>28° · Mostly clear</div>
        </div>

        <FingerprintScanner />

        <div className={styles.bottomControls}>
          <button
            type="button"
            className={`${styles.shortcut} ${
              flashlight ? styles.shortcutActive : ""
            }`}
            onPointerDown={stopPropagation}
            onClick={(event) => {
              event.stopPropagation();
              setFlashlight((current) => !current);
            }}
            aria-label="Flashlight"
          >
            ●
          </button>

          <button
            type="button"
            className={styles.shortcut}
            onPointerDown={stopPropagation}
            onClick={(event) => {
              event.stopPropagation();
              console.log("camera");
            }}
            aria-label="Camera"
          >
            ◉
          </button>
        </div>

        <div className={styles.homeIndicator} />

        <div
          className={`${styles.notificationShade} ${
            shadeOpen ? styles.notificationShadeOpen : ""
          }`}
          style={{
            transform: `translateY(${(shadeProgress - 1) * 100}%)`,
            transition: shadeDragging
              ? "none"
              : "transform 0.32s cubic-bezier(.2,.8,.2,1)",
          }}
          onPointerDown={handleShadePointerDown}
          onPointerMove={handleShadePointerMove}
          onPointerUp={finishShadeDrag}
          onPointerCancel={finishShadeDrag}
        >
          <div className={styles.shadeHeader}>
            <div>
              <div className={styles.shadeTime}>
                {hour}:{minute}
              </div>
              <div className={styles.shadeDate}>{date}</div>
            </div>

            <button
              type="button"
              className={styles.shadeClose}
              onPointerDown={stopPropagation}
              onClick={(event) => {
                event.stopPropagation();
                closeShade();
              }}
              aria-label="Close notification shade"
            >
              ×
            </button>
          </div>

          <div className={styles.quickSettings}>
            <button
              type="button"
              className={`${styles.quickSetting} ${
                wifi ? styles.quickSettingActive : ""
              }`}
              onPointerDown={stopPropagation}
              onClick={(event) => {
                event.stopPropagation();
                setWifi((current) => !current);
              }}
            >
              <span className={styles.quickSettingIcon}>⌁</span>
              <span>Wi-Fi</span>
            </button>

            <button
              type="button"
              className={`${styles.quickSetting} ${
                bluetooth ? styles.quickSettingActive : ""
              }`}
              onPointerDown={stopPropagation}
              onClick={(event) => {
                event.stopPropagation();
                setBluetooth((current) => !current);
              }}
            >
              <span className={styles.quickSettingIcon}>ᛒ</span>
              <span>Bluetooth</span>
            </button>

            <button
              type="button"
              className={`${styles.quickSetting} ${
                doNotDisturb ? styles.quickSettingActive : ""
              }`}
              onPointerDown={stopPropagation}
              onClick={(event) => {
                event.stopPropagation();
                setDoNotDisturb((current) => !current);
              }}
            >
              <span className={styles.quickSettingIcon}>−</span>
              <span>Do Not Disturb</span>
            </button>

            <button
              type="button"
              className={`${styles.quickSetting} ${
                flashlight ? styles.quickSettingActive : ""
              }`}
              onPointerDown={stopPropagation}
              onClick={(event) => {
                event.stopPropagation();
                setFlashlight((current) => !current);
              }}
            >
              <span className={styles.quickSettingIcon}>◐</span>
              <span>Flashlight</span>
            </button>
          </div>

          <div className={styles.notifications}>
            <div className={styles.notification}>
              <div className={styles.notificationApp}>PROJECT-VCR</div>
              <div className={styles.notificationTitle}>
                Your workspace is running
              </div>
              <div className={styles.notificationText}>
                Everything is up to date.
              </div>
            </div>

            <div className={styles.notification}>
              <div className={styles.notificationApp}>PHONE</div>
              <div className={styles.notificationTitle}>
                Fingerprint scanner
              </div>
              <div className={styles.notificationText}>
                Ready for authentication.
              </div>
            </div>
          </div>

          <div className={styles.shadeHandle} />
        </div>
      </div>
    </div>
  );
}