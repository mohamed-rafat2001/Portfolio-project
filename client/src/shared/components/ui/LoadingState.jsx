import { motion as Motion } from "framer-motion";
import { PuffLoader } from "react-spinners";

const LoadingState = ({ message = "Loading..." }) => {
	return (
		<Motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="flex flex-col items-center justify-center min-h-[400px] w-full bg-[#030712]/50 backdrop-blur-sm text-white space-y-8"
		>
			<div className="relative flex items-center justify-center">
				{/* Modern Spinner from react-spinners */}
				<PuffLoader
					color="#f59e0b"
					size={100}
					speedMultiplier={1.5}
				/>
				
				{/* Centered Dot for extra flair */}
				<Motion.div
					animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
					className="absolute w-3 h-3 bg-orange rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]"
				/>
			</div>

			<div className="flex flex-col items-center space-y-4">
				<Motion.span
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-white/80 font-medium text-lg tracking-wider"
				>
					{message}
				</Motion.span>
				
				<div className="flex gap-2">
					{[0, 1, 2].map((i) => (
						<Motion.div
							key={i}
							animate={{ 
								y: [0, -6, 0],
								opacity: [0.3, 1, 0.3],
								scale: [1, 1.2, 1]
							}}
							transition={{ 
								duration: 1, 
								repeat: Infinity, 
								delay: i * 0.15,
								ease: "easeInOut"
							}}
							className="w-1.5 h-1.5 bg-orange rounded-full"
						/>
					))}
				</div>
			</div>
		</Motion.div>
	);
};

export default LoadingState;
