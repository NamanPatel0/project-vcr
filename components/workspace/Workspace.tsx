"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Card from "@/components/card/Card";
import { workspaceCards } from "@/lib/workspace";


export default function Workspace() {

  const [expanded, setExpanded] =
    useState<string | null>(null);



  return (

    <motion.div

      initial={{
        opacity:0,
      }}

      animate={{
        opacity:1,
      }}

      transition={{
        duration:0.5,
      }}

      style={{
        position:"absolute",
        inset:0,
      }}

    >

      {workspaceCards.map((card) => (

        <Card

          key={card.id}

          title={card.title}

          subtitle={card.subtitle}

          x={card.x}

          y={card.y}

          width={card.width}

          height={card.height}

          color={card.color}

          rotation={card.rotation}

          delay={card.delay}

          variant={card.variant}


          selected={
            expanded === card.id
          }


          onClick={() => {

            if (card.variant !== "sticker") {
              return;
            }


            setExpanded((current) =>
              current === card.id
                ? null
                : card.id
            );

          }}

        />

      ))}


    </motion.div>

  );
}