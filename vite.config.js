import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@containers": "/src/containers",
      "@helpers": "/src/helpers",
      "@pages": "/src/pages",
      "@navigator": "/src/navigator",
      "@assets": "/src/assets",
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  esbuild: {
    loader: "jsx",
    include: ["src/**/*.js", "src/**/*.jsx"],
    exclude: ["node_modules"],
    target: 'esnext',
  },
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
});
