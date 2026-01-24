import { motion as Motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg", hideHeader = false }) => {
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
						className="absolute inset-0 bg-[#030712]/60 backdrop-blur-md"
					/>

					{/* Modal Content */}
					<Motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						className={`relative w-full ${maxWidth} bg-[#0b1120] rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 flex flex-col max-h-[95vh]`}
					>
						{/* Header */}
						{!hideHeader && title && (
							<div className="flex items-center justify-between px-10 py-8 border-b border-white/5">
								<h3 className="text-xl font-black uppercase tracking-tight text-white">
									{title}
								</h3>
								<button
									onClick={onClose}
									className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-colors cursor-pointer"
								>
									<HiOutlineXMark className="text-2xl" />
								</button>
							</div>
						)}

						{/* Body */}
						<div className="p-10 overflow-y-auto custom-scrollbar">
							{children}
						</div>
					</Motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
