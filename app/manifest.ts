import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trymbak Mahanat - Full Stack Developer & Web3 Builder",
    short_name: "Trymbak Mahanat",
    description:
      "Portfolio of Trymbak Mahanat - Full stack developer specializing in web3, blockchain infrastructure, gaming, and enterprise solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ec4899",
    icons: [
      {
        src: "/pfp.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    categories: ["portfolio", "developer", "web3", "blockchain"],
    lang: "en",
    orientation: "portrait-primary",
  };
}
