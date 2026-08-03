import Background from "@/components/background/Background";
import Workspace from "@/components/workspace/Workspace";
import Cursor from "@/components/cursor/Cursor";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden">
      <Background />
      <Workspace />
      <Cursor />
    </main>
  );
}