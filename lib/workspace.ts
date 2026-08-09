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

    x: "10%",
    y: "17%",

    width: 340,
    height: 230,

    color: "#ff6a5f",

    rotation: -2,

    delay: 0,

    variant: "sticker",
  },


  {
    id: "work",

    title: "viewfinderrr",

    subtitle: "the pics I takeee",

    x: "40%",
    y: "12%",

    width: 450,
    height: 300,

    color: "#111111",

    rotation: 2,

    delay: 0.2,

    variant: "default",
  },


  {
    id: "projects",

    title: "other projectss",

    subtitle: undefined,

    x: "16%",
    y: "59%",

    width: 420,
    height: 210,

    color: "#012456",

    rotation: -1,

    delay: 0.4,

    variant: "default",
  },


  {
    id: "contact",

    title: "contacttt",

    x: "50%",
    y: "60%",

    width: 250,
    height: 170,

    color: "#c8ddff",

    rotation: -4,

    delay: 0.6,

    variant: "default",
  },

];