export interface WorkspaceCard {
  id: string;
  title: string;
  subtitle?: string;
  x: string;
  y: string;
  width: number;
  height: number;
  color: string;
  rotation: number;
  delay: number;
  variant?: "default" | "sticker";
}

export const workspaceCards: WorkspaceCard[] = [
  {
    id: "me",
    title: "Naman Patel",
    subtitle: "designer · developer",
    x: "12%",
    y: "18%",
    width: 340,
    height: 230,
    color: "#ff6a5f",
    rotation: -2,
    delay: 0,
    variant: "sticker",
  },
  {
    id: "work",
    title: "my workkk",
    subtitle: "the pics I takeee",
    x: "47%",
    y: "15%",
    width: 450,
    height: 300,
    color: "#dbe8ff",
    rotation: 1,
    delay: 0.2,
    variant: "default",
  },
  {
    id: "projects",
    title: "other projectss",
    subtitle: "kwel shi I made",
    x: "18%",
    y: "58%",
    width: 420,
    height: 210,
    color: "#efe1ff",
    rotation: -1,
    delay: 0.4,
    variant: "default",
  },
  {
    id: "contact",
    title: "contacttt",
    x: "68%",
    y: "62%",
    width: 250,
    height: 170,
    color: "#ffe7db",
    rotation: 2,
    delay: 0.6,
    variant: "default",
  },
];