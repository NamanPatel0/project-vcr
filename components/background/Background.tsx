"use client";

import Phone from "./Phone";

export default function Background() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "#f8f8f6",
      }}
    >
      <Phone />
    </div>
  );
}