import { motion as Motion } from "framer-motion";

const FormCard = ({ title, description, children, icon, color }) => {
	return (
		<Motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden relative group"
		>
			{/* Decorative Icon */}
			<div
				className={`absolute -right-6 -top-6 w-32 h-32 ${color} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rounded-full flex items-center justify-center text-8xl`}
			>
				{icon}
			</div>

			<div className="relative">
				<div className="flex items-center gap-4 mb-8">
					<div
						className={`w-12 h-12 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-xl text-${color.replace(
							"bg-",
							""
						)}`}
					>
						{icon}
					</div>
					<div>
						<h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
							{title}
						</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{description}
						</p>
					</div>
				</div>

				<div className="space-y-6">{children}</div>
			</div>
		</Motion.div>
	);
};

export default FormCard;
