import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // Load port from file .env.*
  const portInEnv: number = parseInt(process.env.VITE_PORT ?? "8000");

  return {
    // vite config
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: portInEnv,
    },
    preview: {
      port: portInEnv,
    },
  };
});
