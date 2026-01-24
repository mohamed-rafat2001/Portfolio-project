import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
	HiOutlinePlus,
	HiOutlineBriefcase,
	HiOutlineAcademicCap,
	HiOutlineEnvelope,
	HiOutlineCodeBracket,
} from "react-icons/hi2";

const QuickActions = () => {
	const actions = [
		{
<<<<<<< HEAD
			title: "NEW PROJECT",
=======
			title: "New Project",
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
			icon: <HiOutlineCodeBracket />,
			link: "/admin/projects",
			color: "bg-blue-500",
		},
		{
<<<<<<< HEAD
			title: "ADD EXPERIENCE",
=======
			title: "Add Experience",
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
			icon: <HiOutlineBriefcase />,
			link: "/admin/experiences",
			color: "bg-orange",
		},
		{
<<<<<<< HEAD
			title: "ADD EDUCATION",
=======
			title: "Add Education",
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
			icon: <HiOutlineAcademicCap />,
			link: "/admin/educations",
			color: "bg-purple-500",
		},
		{
<<<<<<< HEAD
			title: "VIEW EMAILS",
=======
			title: "View Emails",
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
			icon: <HiOutlineEnvelope />,
			link: "/admin/emails",
			color: "bg-green-500",
		},
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{actions.map((action, index) => (
				<Motion.div
					key={action.title}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
				>
					<Link
						to={action.link}
<<<<<<< HEAD
						className="group flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-orange/20 transition-all shadow-sm"
=======
						className="group flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-orange/20 transition-all shadow-sm"
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
					>
						<div
							className={`w-12 h-12 rounded-2xl ${action.color} text-white flex items-center justify-center text-xl shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}
						>
							<HiOutlinePlus />
						</div>
						<div>
							<h4 className="font-bold text-gray-900 dark:text-white group-hover:text-orange transition-colors">
								{action.title}
							</h4>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Click to manage
							</p>
						</div>
					</Link>
				</Motion.div>
			))}
		</div>
	);
};

export default QuickActions;
