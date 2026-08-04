import { LayoutGroup } from "framer-motion";

import Background from "@/components/background/Background";
import Workspace from "@/components/workspace/Workspace";
import Cursor from "@/components/cursor/Cursor";

export default function Home() {
  return (
    <LayoutGroup>
      <main
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          cursor: "none",
        }}
      >
        <Background />

        <Workspace />

        <Cursor />
      </main>
    </LayoutGroup>
  );
}