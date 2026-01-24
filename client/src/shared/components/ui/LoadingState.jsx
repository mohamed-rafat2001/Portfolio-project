import { motion as Motion } from "framer-motion";

const LoadingState = ({ message = "Loading..." }) => {
	return (
<<<<<<< HEAD
		<div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-[#030712] text-white space-y-8">
			<div className="relative">
				{/* Main Spinner */}
				<Motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					className="w-20 h-20 border-t-2 border-b-2 border-orange rounded-full shadow-[0_0_15px_rgba(255,165,0,0.3)]"
				/>
				
				{/* Decorative Inner Circles */}
				<Motion.div
					animate={{ rotate: -360 }}
					transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
					className="absolute inset-2 border-r-2 border-l-2 border-white/20 rounded-full"
				/>
				
				<Motion.div
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
					className="absolute inset-0 flex items-center justify-center"
				>
					<div className="w-2 h-2 bg-orange rounded-full shadow-[0_0_10px_rgba(255,165,0,0.8)]" />
				</Motion.div>
			</div>

			<div className="flex flex-col items-center space-y-2">
				<Motion.span
					initial={{ opacity: 0.5 }}
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity }}
					className="text-orange font-black text-sm uppercase tracking-[0.4em]"
				>
					{message}
				</Motion.span>
				<div className="flex gap-1">
					{[0, 1, 2].map((i) => (
						<Motion.div
							key={i}
							animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
							transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
							className="w-1 h-1 bg-orange rounded-full"
						/>
					))}
				</div>
=======
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
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
			</div>
		</div>
	);
};

export default LoadingState;
