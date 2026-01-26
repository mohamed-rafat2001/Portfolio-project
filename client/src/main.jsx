import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Suppress console logs in production
if (import.meta.env.PROD) {
	console.log = () => {};
	console.error = () => {};
	console.debug = () => {};
	console.warn = () => {};
	console.info = () => {};
}

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
