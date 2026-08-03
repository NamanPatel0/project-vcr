"use client";

import Card from "@/components/card/Card";
import { workspaceCards } from "@/lib/workspace";

export default function Workspace() {
  return (
    <>
      {workspaceCards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          x={card.x}
          y={card.y}
          width={card.width}
          height={card.height}
          color={card.color}
          rotation={card.rotation}
          delay={card.delay}
        />
      ))}
    </>
  );
}