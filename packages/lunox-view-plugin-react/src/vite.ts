import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";

export function reactConfig(): UserConfig {
  return {
    plugins: [react()],
    resolve: {
      dedupe: ["react", "react-dom"],
    },
  };
}
