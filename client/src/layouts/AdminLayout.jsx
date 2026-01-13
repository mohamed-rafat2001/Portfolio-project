import { Outlet } from "react-router-dom";

import ScrollToTop from "../ui/ScrollToTop.jsx";

const AdminLayout = () => {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<main className="">
				<Outlet />
			</main>

			<ScrollToTop />
		</div>
	);
};
export default AdminLayout;
