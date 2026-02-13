import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import LoadingState from "../shared/components/ui/LoadingState";

// Lazy load features
const Home = lazy(() => import("../features/home/Home"));
const PublicProjects = lazy(() => import("../features/home/PublicProjects"));
const ProjectDetails = lazy(() => import("../features/home/ProjectDetails"));
const PublicSkills = lazy(() => import("../features/home/PublicSkills"));

const Login = lazy(() => import("../features/auth/Login"));

const Dashboard = lazy(() => import("../features/adminPanel/Dashboard/Dashboard"));
const Profile = lazy(() => import("../features/adminPanel/Profile/Profile"));
const Projects = lazy(() => import("../features/adminPanel/Projects/Projects"));
const Educations = lazy(() => import("../features/adminPanel/Educations/Educations"));
const Experiences = lazy(() => import("../features/adminPanel/Experiences/Experiences"));
const Skills = lazy(() => import("../features/adminPanel/Skills/Skills"));
const Emails = lazy(() => import("../features/adminPanel/Emails/Emails"));

import NotFound from "../shared/components/ui/NotFound";
import ProtectRoute from "./ProtectRoute.jsx";

const router = createBrowserRouter([
	{
		element: (
			<Suspense fallback={<LoadingState message="Loading..." />}>
				<AppLayout />
			</Suspense>
		),
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
				element: (
					<Suspense fallback={<LoadingState message="Loading Admin Panel..." />}>
						<AdminLayout />
					</Suspense>
				),
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
