import { motion as Motion } from "framer-motion";
import {
	HiPaperAirplane,
	HiEnvelope,
	HiPhone,
	HiMapPin,
} from "react-icons/hi2";

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
};

const Contact = () => {
	return (
		<Motion.section
			id="contact"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-16">
					<span className="text-orange font-black text-sm uppercase tracking-[0.3em]">
						05
					</span>
					<div className="h-1px grow bg-gray-200 dark:bg-gray-800"></div>
					<h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
						Get In Touch
					</h2>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="text-center space-y-4 mb-12">
						<h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
							Let's Work Together
						</h3>
						<p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm font-medium leading-relaxed">
							Have a project in mind or just want to say hi? Feel free to reach
							out and let's build something amazing together.
						</p>
					</div>
					<div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/3 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
						{/* Background Glow */}
						<div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

						<form className="relative z-10 space-y-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="space-y-3">
									<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
										Your Name
									</label>
									<input
										type="text"
										placeholder="John Doe"
										className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:border-orange/30 focus:outline-none transition-all text-sm font-medium"
									/>
								</div>
								<div className="space-y-3">
									<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
										Your Email
									</label>
									<input
										type="email"
										placeholder="john@example.com"
										className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:border-orange/30 focus:outline-none transition-all text-sm font-medium"
									/>
								</div>
							</div>

							<div className="space-y-3">
								<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
									Message
								</label>
								<textarea
									rows="5"
									placeholder="Tell me about your project..."
									className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:border-orange/30 focus:outline-none transition-all text-sm font-medium resize-none"
								></textarea>
							</div>

							<div className="flex justify-end">
								<button className="px-10 py-4 bg-orange text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange/20 active:scale-95 flex items-center gap-3">
									Send Message
									<HiPaperAirplane className="rotate-45" />
								</button>
							</div>
						</form>

						{/* Bottom Info Bar */}
						<div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-700 flex flex-wrap justify-between gap-8">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange">
									<HiEnvelope />
								</div>
								<div>
									<p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
										Email Me
									</p>
									<p className="text-xs font-bold text-[#1a1a1a] dark:text-white">
										mohamed20rafat@gmail.com
									</p>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange">
									<HiPhone />
								</div>
								<div>
									<p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
										Call Me
									</p>
									<p className="text-xs font-bold text-[#1a1a1a] dark:text-white">
										+20 1050330514
									</p>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange">
									<HiMapPin />
								</div>
								<div>
									<p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
										Location
									</p>
									<p className="text-xs font-bold text-[#1a1a1a] dark:text-white">
										Egypt
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Motion.section>
	);
};

export default Contact;
