import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
	return (
		<div className="min-h-screen">
			<header className="">
				<Header />
			</header>
			<main className="">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default AppLayout;
