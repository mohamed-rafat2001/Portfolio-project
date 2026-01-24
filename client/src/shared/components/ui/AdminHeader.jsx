import { motion as Motion } from "framer-motion";

const AdminHeader = ({ title, description, icon, action }) => {
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-[#0b1120] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-60"></div>
            
			<div className="flex items-center gap-8 relative z-10">
				{icon && (
					<div className="w-20 h-20 rounded-[2rem] bg-[#030712] border border-white/5 flex items-center justify-center text-4xl text-orange">
						{icon}
					</div>
				)}
				<div>
					<h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
						{title}
					</h1>
					<p className="text-gray-500 font-medium text-xs md:text-sm mt-1 uppercase tracking-widest opacity-60">
						{description}
					</p>
				</div>
			</div>

			{action && (
				<Motion.button
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.95 }}
					onClick={action.onClick}
					className="relative z-10 flex items-center justify-center gap-4 bg-orange text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-orange/20 hover:shadow-orange/40 transition-all cursor-pointer"
				>
					{action.icon && <span className="text-lg">{action.icon}</span>}
					{action.label}
				</Motion.button>
			)}
		</div>
	);
};

export default AdminHeader;
