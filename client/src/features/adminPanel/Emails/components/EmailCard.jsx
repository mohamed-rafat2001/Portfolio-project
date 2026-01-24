import { motion as Motion } from "framer-motion";
import { HiOutlineTrash, HiOutlineClock } from "react-icons/hi2";
import { format } from "date-fns";

const EmailCard = ({ email, onClick, onDelete, isSelected }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className={`group relative p-8 rounded-[2rem] transition-all cursor-pointer shadow-xl ${
				isSelected
					? "bg-orange text-white"
					: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 text-gray-900 dark:text-white hover:border-orange/20"
			}`}
			onClick={() => onClick(email)}
		>
			<div className="flex flex-col gap-2 relative z-10">
				<div className="flex items-center justify-between gap-4 pr-8">
					<h3 className={`text-sm font-black uppercase tracking-widest truncate ${isSelected ? "text-white" : "text-gray-900 dark:text-white"}`}>
						{email.userName}
					</h3>
				</div>
                
				<p className={`text-[10px] font-bold truncate ${isSelected ? "text-white/80" : "text-gray-400"}`}>
					{email.userEmail}
				</p>
                
                <div className={`mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white/60" : "text-gray-400"}`}>
                    <HiOutlineClock className="text-xs" />
                    <span>{format(new Date(email.createdAt), "MM/dd/yyyy")}</span>
                </div>

				<button
					onClick={(e) => {
						e.stopPropagation();
						onDelete(email._id);
					}}
					className={`absolute top-0 right-0 p-2 rounded-xl transition-all ${
                        isSelected 
                            ? "text-white hover:bg-white/10" 
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    }`}
				>
					<HiOutlineTrash className="text-lg" />
				</button>
			</div>
		</Motion.div>
	);
};

export default EmailCard;
