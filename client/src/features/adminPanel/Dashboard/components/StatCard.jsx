import { motion as Motion } from "framer-motion";

const StatCard = ({ title, value, icon, trend, color }) => {
	return (
		<Motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-orange/20 transition-all"
		>
			<div className="flex items-center justify-between mb-6">
				<div
					className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-2xl text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}
				>
					{icon}
				</div>
				{trend && (
					<span
						className={`text-xs font-black px-3 py-1 rounded-full ${
							trend.startsWith("+")
								? "bg-green-50 text-green-500 dark:bg-green-900/20"
								: "bg-red-50 text-red-500 dark:bg-red-900/20"
						}`}
					>
						{trend}
					</span>
				)}
			</div>
			<div>
				<p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
					{title}
				</p>
				<h3 className="text-3xl font-black text-gray-900 dark:text-white">
					{value}
				</h3>
			</div>
		</Motion.div>
	);
};

export default StatCard;
