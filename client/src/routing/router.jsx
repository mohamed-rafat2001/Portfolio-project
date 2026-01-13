import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "../layouts/AppLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import Home from "../features/home/Home.jsx";
import PublicProjects from "../features/home/PublicProjects.jsx";
import PublicSkills from "../features/home/PublicSkills.jsx";

import Login from "../features/auth/Login.jsx";
import Signup from "../features/auth/Signup.jsx";

import Profile from "../features/adminPanel/Profile/Profile.jsx";
import Projects from "../features/adminPanel/Projects/Projects.jsx";
import Educations from "../features/adminPanel/Educations/Educations.jsx";
import Experiences from "../features/adminPanel/Experiences/Experiences.jsx";
import Skills from "../features/adminPanel/skills/Skills.jsx";

import NotFound from "../ui/NotFound.jsx";
import ProtectRoute from "./ProtectRoute.jsx";

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
				element: <PublicProjects />,
			},
			{
				path: "/skills",
				element: <PublicSkills />,
			},
		],
	},
	{
		element: <ProtectRoute />,
		children: [
			{
				path: "/adminPanel",
				element: <AdminLayout />,
				children: [
					{
						index: true,
						path: "profile",
						element: <Profile />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
					{
						path: "educations",
						element: <Educations />,
					},
					{
						path: "projects",
						element: <Projects />,
					},
					{
						path: "experiences",
						element: <Experiences />,
					},
					{
						path: "skills",
						element: <Skills />,
					},
				],
			},
		],
	},
	{
		path: "/404",
		element: <NotFound />,
	},
	{
		path: "*",
		element: <Navigate to="/404" />,
	},
]);
export default router;
