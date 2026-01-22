import { motion as Motion } from "framer-motion";

const LoadingState = ({ message = "Loading..." }) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
			<div className="relative w-20 h-20">
				<Motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					className="absolute inset-0 border-4 border-orange/10 border-t-orange rounded-full"
				/>
				<Motion.div
					animate={{ rotate: -360 }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
					className="absolute inset-4 border-4 border-gray-100 dark:border-gray-800 border-b-orange/30 rounded-full"
				/>
			</div>
			<div className="space-y-2 text-center">
				<h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white animate-pulse">
					{message}
				</h3>
				<p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
					Please wait a moment
				</p>
			</div>
		</div>
	);
};

export default LoadingState;
