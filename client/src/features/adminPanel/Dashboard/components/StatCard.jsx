import { motion as Motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

const StatCard = ({ title, value, icon, color }) => {
	return (
		<Motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
			className="p-10 bg-white dark:bg-[#0b1120] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl group hover:border-orange/20 transition-all relative flex flex-col justify-between aspect-square"
		>
            <div className="flex items-start justify-between">
                <div
                    className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-2xl text-white shadow-xl group-hover:scale-110 transition-transform duration-500`}
                >
                    {icon}
                </div>
                <div className="text-gray-300 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    <HiArrowUpRight className="text-2xl" />
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                    {value}
                </h3>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    {title}
                </p>
            </div>
		</Motion.div>
	);
};

export default StatCard;
