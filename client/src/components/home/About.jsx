import { motion as Motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import profileImg from "../../assets/profissionalMe.png";

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

const About = () => {
	return (
		<Motion.section
			id="about"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-white dark:bg-gray-900 overflow-hidden"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-16">
					<span className="text-orange font-black text-sm uppercase tracking-[0.3em]">
						01
					</span>
					<div className="h-px grow bg-gray-200 dark:bg-gray-800"></div>
					<h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
						About Me
					</h2>
				</div>

				<div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
					{/* Image Section */}
					<div className="flex-1 w-full max-w-md lg:max-w-none">
						<div className="relative">
							{/* Background Square decoration */}
							<div className="absolute -inset-4 bg-orange/10 dark:bg-orange/5 rounded-[2.5rem] -rotate-3 transition-transform group-hover:rotate-0"></div>

							<div className="relative aspect-square rounded-4xl bg-gray-100 dark:bg-gray-800 overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl">
								<img
									src={profileImg}
									alt="Mohamed Rafat"
									className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
								/>
							</div>
						</div>
					</div>

					{/* Text Content */}
					<div className="flex-1 space-y-8">
						<div className="space-y-4">
							<h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] dark:text-white leading-tight">
								Hello, I'm Mohamed
							</h3>
						</div>

						<div className="space-y-6 text-gray-500 dark:text-gray-400">
							<p className="text-lg md:text-xl leading-relaxed">
								I am a dedicated{" "}
								<span className="text-[#1a1a1a] dark:text-white font-bold">
									Full Stack Developer
								</span>{" "}
								with a deep passion for creating seamless digital experiences.
								My journey began with a curiosity for how things work on the
								web, which quickly evolved into a career building robust
								applications.
							</p>
							<p className="text-lg md:text-xl leading-relaxed">
								With a strong foundation in both frontend and backend
								technologies, I enjoy bridging the gap between design and
								technical implementation. I thrive in collaborative environments
								where I can solve complex problems and contribute to innovative
								solutions.
							</p>
						</div>

						<div className="pt-4">
							<a
								href="#contact"
								className="group inline-flex items-center gap-3 text-orange font-black uppercase tracking-[0.2em] text-sm hover:gap-5 transition-all"
							>
								Let's Talk
								<HiArrowRight className="text-lg" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</Motion.section>
	);
};

export default About;
