"use client";

import styles from "./card.module.css";

export default function StickyNote() {
  return (
    <div className={styles.note}>
      <div className={styles.pin} />

      <div className={styles.paper}>
        <div className={styles.noteLines} />

        <h2 className={styles.noteTitle}>
          contacttt
          <br />
          mee
        </h2>
      </div>
    </div>
  );
}