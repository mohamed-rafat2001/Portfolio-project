import { motion as Motion } from "framer-motion";
import { HiArrowUpRight, HiArrowLongRight, HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import useProjects from "../../adminPanel/Projects/hooks/useProjects";
import LoadingState from "../../../shared/components/ui/LoadingState";
import ProjectCard from "../../../shared/components/ui/ProjectCard";

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

const Projects = () => {
	const { projects, isLoading } = useProjects();

	if (isLoading) return <LoadingState message="Loading projects..." />;

	return (
		<Motion.section
			id="projects"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-[#030712] text-white overflow-hidden"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between mb-20">
					<div className="flex items-baseline gap-6 overflow-hidden">
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                            Featured Projects
                        </h2>
                    </div>
					<div className="flex-grow mx-10 h-px bg-white/10 relative hidden md:block">
						<span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase tracking-[0.5em] pl-6 bg-[#030712]">
							{projects?.length || 0}
						</span>
					</div>
                    
                    {/* Navigation Buttons */}
                    <div className="flex gap-3">
                        <button className="projects-prev-btn w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-orange hover:border-orange hover:text-white transition-all cursor-pointer shadow-xl disabled:opacity-10">
                            <HiArrowLongLeft className="text-xl" />
                        </button>
                        <button className="projects-next-btn w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-orange hover:border-orange hover:text-white transition-all cursor-pointer shadow-xl disabled:opacity-10">
                            <HiArrowLongRight className="text-xl" />
                        </button>
                    </div>
				</div>

				{/* Slider Container */}
				<div className="-mx-4 px-4">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        grabCursor={true}
                        navigation={{
                            prevEl: '.projects-prev-btn',
                            nextEl: '.projects-next-btn',
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1280: {
                                slidesPerView: 3,
                            },
                        }}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        className="pb-24"
                    >
                        {projects?.map((project, index) => (
                            <SwiperSlide key={project._id} className="h-auto">
                                <ProjectCard project={project} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
				</div>

				<div className="text-center mt-16">
					<Link 
						to="/projects"
						className="inline-flex items-center gap-4 px-14 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.34em] text-[10px] hover:bg-orange hover:text-white transition-all duration-700 shadow-2xl hover:-translate-y-2 group"
					>
						View All Projects 
						<HiArrowUpRight className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
					</Link>
				</div>
			</div>
		</Motion.section>
	);
};

export default Projects;
