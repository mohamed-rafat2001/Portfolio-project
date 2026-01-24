import { motion as Motion } from "framer-motion";

const AdminHeader = ({ title, description, icon, action }) => {
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
			<div className="flex items-center gap-6">
				{icon && (
					<div className="p-4 bg-orange/10 rounded-2xl text-orange hidden sm:block">
						<div className="text-3xl">
							{icon}
						</div>
					</div>
				)}
				<div>
					<h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
						{title}
					</h1>
					<p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
						{description}
					</p>
				</div>
			</div>

			{action && (
				<Motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={action.onClick}
					className="flex items-center justify-center gap-3 bg-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange/20 hover:shadow-orange/40 transition-all cursor-pointer"
				>
					{action.icon && <span className="text-lg">{action.icon}</span>}
					{action.label}
				</Motion.button>
			)}
		</div>
	);
};

export default AdminHeader;
