import { motion as Motion } from "framer-motion";
import { HiOutlineHandRaised, HiOutlineUser } from "react-icons/hi2";

const WelcomeSection = ({ user }) => {
	return (
		<section className="mb-14">
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
				<div>
					<Motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="flex items-center gap-3 mb-6"
					>
						<div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange border border-orange/10">
							<HiOutlineHandRaised className="text-xl" />
						</div>
						<span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange">
							Welcome back
						</span>
					</Motion.div>
					<Motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl font-black text-white mb-4"
                    >
						Hello,
					</Motion.h1>
                    <Motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 font-medium text-lg"
                    >
                        Here's what's happening with your portfolio today.
                    </Motion.p>
				</div>

                {/* Status Card (matches Image 2 top right) */}
                <Motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="hidden lg:flex items-center gap-6 p-6 bg-[#0b1120] border border-white/5 rounded-[2rem] shadow-2xl min-w-[300px]"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#030712] border border-white/10 flex items-center justify-center text-gray-700">
                        <HiOutlineUser className="text-2xl" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange block mb-1">Administrator</span>
                        <span className="text-sm font-black text-white uppercase tracking-widest">{user?.name}</span>
                    </div>
                </Motion.div>
			</div>
		</section>
	);
};

export default WelcomeSection;
