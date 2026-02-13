import { motion as Motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg", hideHeader = false, padding = "px-12 pb-12" }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-100 flex items-center justify-center p-4">
					{/* Backdrop */}
					<Motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-gray-900/60 dark:bg-[#030712]/60 backdrop-blur-md"
					/>

					{/* Modal Content */}
					<Motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className={`relative w-full ${maxWidth} bg-white dark:bg-[#030712] rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-gray-100 dark:border-white/5 flex flex-col max-h-[95vh]`}
					>
						{/* Header */}
						{!hideHeader && title && (
							<div className="flex items-center justify-between px-12 py-10">
								<h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white mb-0">
									{title}
								</h3>
								<button
									onClick={onClose}
									aria-label="Close modal"
									className="p-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
								>
									<HiOutlineXMark className="text-2xl" />
								</button>
							</div>
						)}

						{/* Body */}
						<div className={`${padding} overflow-y-auto custom-scrollbar`}>
							{children}
						</div>
					</Motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
