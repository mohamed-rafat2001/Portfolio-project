import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { 
    HiArrowUpRight, 
    HiCodeBracket, 
    HiGlobeAlt, 
    HiOutlineArrowLeft,
    HiOutlineInformationCircle,
    HiOutlinePhoto,
    HiOutlineCircleStack,
    HiOutlineSparkles,
    HiChevronLeft,
    HiChevronRight
} from "react-icons/hi2";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination as SwiperPagination, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

import useProject from "../adminPanel/Projects/hooks/useProject";
import LoadingState from "../../shared/components/ui/LoadingState";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const { project, isLoading, error } = useProject();
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    if (isLoading) return <LoadingState message="Loading project details..." />;
    if (error || !project) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#030712] text-gray-900 dark:text-white transition-colors duration-500">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Project not found</h2>
            <Link to="/projects" className="text-orange font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
                <HiOutlineArrowLeft /> Back to projects
            </Link>
        </div>
    );

    const { 
        title, 
        description,
        techStack, 
        liveUrl, 
        repoUrl, 
        mainImg, 
        images,
        status = "Completed & Live",
        architecture = "Full Stack Web App"
    } = project;

    const hasLongDescription = description?.length > 400;
    const truncatedDescription = hasLongDescription ? `${description.slice(0, 400)}...` : description;
    const galleryImages = images && images.length > 0 ? images : [mainImg];

    return (
        <div className="bg-white dark:bg-[#030712] min-h-screen text-gray-900 dark:text-white pb-32 overflow-hidden selection:bg-orange/30 transition-colors duration-500">
            {/* Header / Hero Section */}
            <div className="relative min-h-[75vh] w-full flex items-center pt-32 pb-44">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={mainImg?.secure_url} 
                        alt={title} 
                        className="w-full h-full object-cover opacity-30 dark:opacity-30"
                        crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-[#030712] dark:via-transparent dark:to-[#030712]"></div>
                </div>
                
                <div className="relative container mx-auto px-4 z-10 text-center md:text-left">
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-full"
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                            <button 
                                onClick={() => navigate('/projects')}
                                className="group inline-flex items-center gap-3 px-6 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all shadow-xl"
                            >
                                <HiOutlineArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
                                <span>Back to projects</span>
                            </button>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 border border-blue-100 dark:border-blue-500/20 rounded-lg">
                                {architecture || "Web Ecosystem"}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-[9.5vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 max-w-full drop-shadow-[0_20px_80px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_20px_80px_rgba(255,255,255,0.05)] text-gray-900 dark:text-white">
                            {title}
                        </h1>

                        <p className="text-gray-500 text-xs font-black uppercase tracking-[0.5em] opacity-60">
                            Engineering Case Study / {new Date().getFullYear()}
                        </p>
                    </Motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-8 space-y-24">
                        
                        {/* Project Overview */}
                        <section className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-1.5 rounded-lg border border-orange/40 text-orange">
                                    <HiOutlineInformationCircle className="text-xl" />
                                </div>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-900/90 dark:text-white/90">Project Overview</h2>
                            </div>

                            <div className="bg-gray-50 dark:bg-[#0a0f1c]/60 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10 lg:p-14 border border-gray-100 dark:border-white/5 shadow-2xl space-y-12 group relative overflow-hidden transition-colors duration-500">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                                
                                <div className="space-y-10 relative z-10">
                                    <div className="flex flex-col gap-8">
                                        <div className="prose dark:prose-invert max-w-none">
                                            <div className="text-gray-600 dark:text-gray-400 text-lg font-medium leading-[1.8] opacity-80">
                                                <span className="float-left text-6xl font-black text-orange mr-4 leading-[0.8] uppercase">
                                                    {(isExpanded ? description : truncatedDescription)?.charAt(0)}
                                                </span>
                                                {(isExpanded ? description : truncatedDescription)?.slice(1)}
                                            </div>
                                        </div>

                                        {hasLongDescription && (
                                            <div className="flex justify-center md:justify-start">
                                                <button 
                                                    onClick={() => setIsExpanded(!isExpanded)}
                                                    className="px-10 py-3.5 bg-gray-900 dark:bg-black border border-gray-800 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-orange hover:border-orange transition-all shadow-xl active:scale-95"
                                                >
                                                    {isExpanded ? "Show Less" : "Read Full Story"}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Sub-cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-10 border-t border-gray-200 dark:border-white/5">
                                        <div className="p-6 md:p-8 bg-white dark:bg-black/40 rounded-[1.5rem] border border-gray-100 dark:border-white/5 flex items-center gap-6 group/box hover:border-orange/20 transition-all">
                                            <div className="text-orange opacity-60">
                                                <HiOutlineSparkles className="text-2xl" />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Status</span>
                                                <span className="text-xs font-black uppercase text-gray-900 dark:text-white tracking-widest">{status}</span>
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8 bg-white dark:bg-black/40 rounded-[1.5rem] border border-gray-100 dark:border-white/5 flex items-center gap-6 group/box hover:border-blue-500/20 transition-all">
                                            <div className="text-blue-600 dark:text-blue-400 opacity-60">
                                                <HiCodeBracket className="text-2xl" />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Architecture</span>
                                                <span className="text-xs font-black uppercase text-gray-900 dark:text-white tracking-widest">{architecture}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Project Gallery */}
                        <section className="space-y-12">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-1.5 rounded-lg border border-orange/40 text-orange">
                                        <HiOutlinePhoto className="text-xl" />
                                    </div>
                                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-900/90 dark:text-white/90">Project Gallery</h2>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex gap-2">
                                        <button className="gallery-prev-btn w-10 h-10 rounded-full bg-white dark:bg-[#0a0f1c] border border-gray-100 dark:border-white/5 flex items-center justify-center hover:bg-orange transition-all text-gray-400 dark:text-white/40 cursor-pointer shadow-lg hover:text-white">
                                            <HiChevronLeft className="text-lg" />
                                        </button>
                                        <button className="gallery-next-btn w-10 h-10 rounded-full bg-white dark:bg-[#0a0f1c] border border-gray-100 dark:border-white/5 flex items-center justify-center hover:bg-orange transition-all text-gray-400 dark:text-white/40 cursor-pointer shadow-lg hover:text-white">
                                            <HiChevronRight className="text-lg" />
                                        </button>
                                    </div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] font-mono">
                                        <span className="text-gray-900 dark:text-white text-base mr-1">{activeIndex + 1}</span> /<span className="ml-2">{galleryImages.length}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Swiper
                                    modules={[Navigation, SwiperPagination, Thumbs, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    grabCursor={true}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    navigation={{
                                        prevEl: '.gallery-prev-btn',
                                        nextEl: '.gallery-next-btn',
                                    }}
                                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                    className="rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0a0f1c] shadow-2xl transition-colors duration-500"
                                >
                                    {galleryImages.map((img, idx) => (
                                        <SwiperSlide key={img.public_id || idx}>
                                            <img
                                                src={img.secure_url}
                                                alt={`Project slide ${idx + 1}`}
                                                className="w-full h-auto aspect-video object-cover"
                                                crossOrigin="anonymous"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Animated Progress Bar */}
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <Motion.div 
                                        className="h-full bg-orange"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${((activeIndex + 1) / galleryImages.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>

                                {/* Thumbnail Slider */}
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={12}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Thumbs]}
                                    breakpoints={{
                                        640: { slidesPerView: 5 },
                                        1024: { slidesPerView: 6 },
                                    }}
                                    className="thumbs-slider"
                                >
                                    {galleryImages.map((img, idx) => (
                                        <SwiperSlide key={`thumb-${idx}`} className="cursor-pointer">
                                            <div className={`aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeIndex === idx ? 'border-orange scale-95' : 'border-transparent opacity-40'}`}>
                                                <img
                                                    src={img.secure_url}
                                                    alt={`Thumbnail ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                    crossOrigin="anonymous"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area (Right) */}
                    <aside className="lg:col-span-4 space-y-10">
                        
                        {/* Links Section */}
                        <div className="space-y-4">
                            {liveUrl && (
                                <Motion.a
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative flex items-center justify-between px-10 py-7 bg-orange text-white rounded-full shadow-[0_20px_40px_-5px_rgba(249,115,22,0.3)] overflow-hidden"
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <HiGlobeAlt className="text-2xl" /> 
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">Live Preview</span>
                                    </div>
                                    <HiArrowUpRight className="text-2xl relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Motion.a>
                            )}
                            {repoUrl && (
                                <Motion.a
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={repoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative flex items-center justify-between px-10 py-7 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full shadow-2xl overflow-hidden"
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <HiCodeBracket className="text-2xl" /> 
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">Source Code</span>
                                    </div>
                                    <HiArrowUpRight className="text-2xl relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 opacity-60" />
                                </Motion.a>
                            )}
                        </div>

                        {/* Tech Stack Card */}
                        <div className="bg-gray-50 dark:bg-[#0a0f1c]/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group transition-colors duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex items-center gap-4 mb-16 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-black border border-gray-100 dark:border-white/10 flex items-center justify-center text-orange shadow-lg">
                                    <HiOutlineCircleStack className="text-xl" />
                                </div>
                                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-900 dark:text-white">Technologies</h3>
                            </div>

                            <div className="space-y-12 relative z-10">
                                {techStack?.map((category, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <div className="flex items-center gap-3 opacity-60">
                                            <div className="w-4 h-4 rounded border-2 border-orange/40 p-[2px] flex items-center justify-center">
                                                <div className="w-1 h-1 bg-orange rounded-full"></div>
                                            </div>
                                            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-900 dark:text-white">{category.title}</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2.5">
                                            {category.techs?.map((tech, tIdx) => (
                                              <Motion.span 
                                                  key={tIdx} 
                                                  whileHover={{ y: -2, scale: 1.05 }}
                                                  className="px-5 py-2.5 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-xl text-[9px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm"
                                              >
                                                  {tech}
                                              </Motion.span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
