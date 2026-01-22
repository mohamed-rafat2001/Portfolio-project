import { Outlet } from "react-router-dom";
import Header from "../shared/components/ui/Header";
import Footer from "../shared/components/ui/Footer";
import ScrollToTop from "../shared/components/ui/ScrollToTop";

const AppLayout = () => {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col overflow-x-hidden relative">
			<Header />
			<main className="grow w-full relative">
				<Outlet />
			</main>
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default AppLayout;
