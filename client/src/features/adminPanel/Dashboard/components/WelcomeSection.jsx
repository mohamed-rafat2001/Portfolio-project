import { motion as Motion } from "framer-motion";
import { HiOutlineHandRaised } from "react-icons/hi2";

const WelcomeSection = ({ user }) => {
	return (
		<section>
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div>
					<Motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="flex items-center gap-3 mb-2"
					>
						<div className="w-10 h-10 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
							<HiOutlineHandRaised className="text-2xl" />
						</div>
						<span className="text-xs font-black uppercase tracking-widest text-orange">
							Welcome back
						</span>
					</Motion.div>
					<h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
						Hello, <span className="text-orange">{user?.fullName?.split(" ")[0]}</span>
					</h1>
				</div>
			</div>
		</section>
	);
};

export default WelcomeSection;
