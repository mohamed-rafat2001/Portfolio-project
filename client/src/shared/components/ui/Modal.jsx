import { motion as Motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
					{/* Backdrop */}
					<Motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
					/>

					{/* Modal Content */}
					<Motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className={`relative w-full ${maxWidth} bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh]`}
					>
						{/* Header */}
						<div className="flex items-center justify-between px-8 py-6 border-b border-gray-50 dark:border-gray-800">
							<h3 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
								{title}
							</h3>
							<button
								onClick={onClose}
								className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
							>
								<HiOutlineXMark className="text-2xl" />
							</button>
						</div>

						{/* Body */}
						<div className="p-8 overflow-y-auto custom-scrollbar">
							{children}
						</div>
					</Motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
