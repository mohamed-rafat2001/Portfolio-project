import { motion as Motion } from "framer-motion";
import { HiOutlineEnvelope, HiOutlineEnvelopeOpen, HiOutlineTrash } from "react-icons/hi2";
import { format } from "date-fns";

const EmailCard = ({ email, onClick, onDelete }) => {
	return (
		<Motion.div
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
<<<<<<< HEAD
			className={`group relative p-6 bg-white dark:bg-gray-900 rounded-[2.5rem] border transition-all cursor-pointer shadow-sm hover:shadow-md ${
=======
			className={`group relative p-6 bg-white dark:bg-gray-900 rounded-[2rem] border transition-all cursor-pointer shadow-sm hover:shadow-md ${
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
				email.read
					? "border-gray-100 dark:border-gray-800 opacity-75"
					: "border-orange/20 dark:border-orange/20 bg-orange/5 dark:bg-orange/5"
			}`}
			onClick={() => onClick(email)}
		>
			<div className="flex items-start gap-4">
				<div
					className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
						email.read
							? "bg-gray-100 dark:bg-gray-800 text-gray-400"
							: "bg-orange text-white shadow-lg shadow-orange/20"
					}`}
				>
					{email.read ? <HiOutlineEnvelopeOpen /> : <HiOutlineEnvelope />}
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between gap-2 mb-1">
						<h3 className={`font-black truncate ${email.read ? "text-gray-600 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>
							{email.userName}
						</h3>
						<span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
							{format(new Date(email.createdAt), "MMM dd")}
						</span>
					</div>
					<p className={`text-sm font-bold truncate mb-1 ${email.read ? "text-gray-400" : "text-orange"}`}>
						{email.subject}
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
						{email.emailBody}
					</p>
				</div>

				<button
					onClick={(e) => {
						e.stopPropagation();
						onDelete(email._id);
					}}
					className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-xl transition-all"
				>
					<HiOutlineTrash className="text-lg" />
				</button>
			</div>
		</Motion.div>
	);
};

export default EmailCard;
