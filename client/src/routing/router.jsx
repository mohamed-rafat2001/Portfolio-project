import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Educations from "../pages/Educations";
import Experiences from "../pages/Experiences";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import AppLayout from "../ui/AppLayout";

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/projects",
				element: <Projects />,
			},
			{
				path: "/skills",
				element: <Skills />,
			},
			{
				path: "/educations",
				element: <Educations />,
			},
			{
				path: "/experiences",
				element: <Experiences />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/404",
				element: <NotFound />,
			},
			{
				path: "*",
				element: <Navigate to="/404" />,
			},
		],
	},
]);
export default router;
