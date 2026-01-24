import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../features/home/Home";
import PublicProjects from "../features/home/PublicProjects";
import ProjectDetails from "../features/home/ProjectDetails";
import PublicSkills from "../features/home/PublicSkills";

import Login from "../features/auth/Login";

import Dashboard from "../features/adminPanel/Dashboard/Dashboard";
import Profile from "../features/adminPanel/Profile/Profile";
import Projects from "../features/adminPanel/Projects/Projects";
import Educations from "../features/adminPanel/Educations/Educations";
import Experiences from "../features/adminPanel/Experiences/Experiences";
import Skills from "../features/adminPanel/Skills/Skills";
import Emails from "../features/adminPanel/Emails/Emails";

import NotFound from "../shared/components/ui/NotFound";
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
				path: "/projects",
				element: <PublicProjects />,
			},
			{
				path: "/projects/:id",
				element: <ProjectDetails />,
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
						element: <Dashboard />,
					},
					{
						path: "dashboard",
						element: <Dashboard />,
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
					{
						path: "emails",
						element: <Emails />,
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
