import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./routing/router";
import queryClient from "./shared/utils/queryClient";
import { ThemeProvider, useTheme } from "./shared/context/ThemeContext";

const ToasterContainer = () => {
	const { isDark } = useTheme();
	return (
		<Toaster
			position="top-center"
			gutter={12}
			containerStyle={{ margin: "8px" }}
			toastOptions={{
				success: {
					duration: 3000,
				},
				error: {
					duration: 5000,
				},
				style: {
					fontSize: "14px",
					maxWidth: "500px",
					padding: "16px 24px",
					backgroundColor: isDark ? "#111827" : "#fff",
					color: isDark ? "#f3f4f6" : "#374151",
					borderRadius: "1rem",
					border: isDark ? "1px solid #1f2937" : "1px solid #f3f4f6",
					boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
					fontWeight: "700",
					textTransform: "uppercase",
					letterSpacing: "0.05em",
				},
			}}
		/>
	);
};

const App = () => {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<ToasterContainer />
				<ReactQueryDevtools initialIsOpen={false} />
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ThemeProvider>
	);
};

export default App;
