import { motion as Motion } from "framer-motion";

const AdminHeader = ({ title, description, icon, action }) => {
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#0b1120] p-6 pr-8 rounded-4xl border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange/5 rounded-full blur-[60px] -mr-24 -mt-24 transition-opacity group-hover:opacity-100 opacity-60"></div>
            
			<div className="flex items-center gap-6 relative z-10">
				{icon && (
					<div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#030712] border border-gray-100 dark:border-white/5 flex items-center justify-center text-2xl text-orange shrink-0">
						{icon}
					</div>
				)}
				<div className="min-w-0">
					<h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white truncate">
						{title}
					</h1>
					<p className="text-gray-400 dark:text-gray-500 font-bold text-[8px] md:text-[9px] mt-1 uppercase tracking-[0.2em] opacity-80 dark:opacity-50 line-clamp-1">
						{description}
					</p>
				</div>
			</div>

			{action && (
				<Motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={action.onClick}
					className="relative z-10 flex items-center justify-center gap-3 bg-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-xl shadow-orange/20 hover:shadow-orange/40 transition-all cursor-pointer whitespace-nowrap"
				>
					{action.icon && <span className="text-base">{action.icon}</span>}
					{action.label}
				</Motion.button>
			)}
		</div>
	);
};

export default AdminHeader;
