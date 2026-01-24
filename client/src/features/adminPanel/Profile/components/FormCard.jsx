import { motion as Motion } from "framer-motion";

const FormCard = ({ title, children, icon, isUpdating, isDirty, showButton = true, headerAction }) => {
	return (
		<Motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-[#0b1120] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl overflow-hidden relative group"
		>
			<div className="relative">
				<div className="flex items-center justify-between gap-4 mb-14">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-[1.2rem] bg-[#030712] border border-white/5 flex items-center justify-center text-2xl text-orange shadow-2xl">
                            {icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                            {title}
                        </h3>
                        {headerAction}
                    </div>

                    {showButton && (
                        <Motion.button
                            whileHover={isDirty ? { scale: 1.02 } : {}}
                            whileTap={isDirty ? { scale: 0.98 } : {}}
                            type="submit"
                            disabled={!isDirty || isUpdating}
                            className={`px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl cursor-pointer ${
                                isDirty && !isUpdating
                                    ? "bg-orange text-white shadow-orange/20"
                                    : "bg-white/5 text-white/20 cursor-not-allowed"
                            }`}
                        >
                            {isUpdating ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                            ) : (
                                "Save Changes"
                            )}
                        </Motion.button>
                    )}
				</div>

				<div className="space-y-10">{children}</div>
			</div>
		</Motion.div>
	);
};

export default FormCard;
