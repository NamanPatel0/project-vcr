import { LayoutGroup } from "framer-motion";

import Background from "@/components/background/Background";
import Workspace from "@/components/workspace/Workspace";


export default function Home() {

  return (

    <div
      style={{
        position:"relative",
        width:"100vw",
        height:"100vh",
        overflow:"hidden",
        cursor:"none",
      }}
    >

      <LayoutGroup>

        <Background />

        <Workspace />

      </LayoutGroup>

    </div>

  );

}