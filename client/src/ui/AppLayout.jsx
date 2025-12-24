import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default AppLayout;
