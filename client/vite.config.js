import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					"vendor-react": ["react", "react-dom", "react-router-dom"],
					"vendor-framer": ["framer-motion"],
					"vendor-icons": ["react-icons"],
                    "vendor-utils": ["date-fns", "axios"],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},
	esbuild: {
		drop: ["console", "debugger"],
	},
});
