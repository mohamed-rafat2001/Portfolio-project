import { useState, useEffect } from "react";
import { m as Motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ProjectCard from "../../shared/components/ui/ProjectCard";
import useProjects from "../adminPanel/Projects/hooks/useProjects";
import LoadingState from "../../shared/components/ui/LoadingState";

const PublicProjects = () => {
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const limit = 6;
	const { projects, isLoading, totalResults } = useProjects({ page, limit, sort: "-createdAt" });

	const totalPages = Math.ceil(totalResults / limit);

	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;
		
		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (page <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);
				pages.push("...");
				pages.push(totalPages);
			} else if (page >= totalPages - 2) {
				pages.push(1);
				pages.push("...");
				for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				pages.push("...");
				pages.push(page - 1);
				pages.push(page);
				pages.push(page + 1);
				pages.push("...");
				pages.push(totalPages);
			}
		}
		return pages;
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [page]);

	const filteredProjects = projects.filter(p => 
		p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
		p.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (isLoading) return <LoadingState message="Fetching all projects..." />;

	return (
		<div className="min-h-screen pt-40 pb-32 bg-white dark:bg-[#030712] text-gray-900 dark:text-white overflow-hidden relative transition-colors duration-500">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-[0.03] scale-110 grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white dark:from-[#030712] dark:via-transparent dark:to-[#030712]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-60"></div>
            </div>

            {/* Darker, more cinematic background effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/10 rounded-full blur-[150px] -mr-64 -mt-32 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-48 -mb-32 opacity-20"></div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Premium Hero Section matching image exactly */}
				<Motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					className="mb-40 max-w-5xl mx-auto text-center"
				>
                    <div className="flex items-center justify-center gap-6 mb-10 overflow-hidden">
                        <div className="w-12 h-[2px] bg-orange relative">
                            <Motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute inset-0 bg-white dark:bg-[#030712] origin-left"
                            ></Motion.div>
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.6em] text-orange">Portfolio Index</span>
                    </div>

					<h1 className="text-6xl md:text-8xl lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 flex flex-col items-center">
						<span className="text-gray-900 dark:text-white">Project</span>
						<span className="text-orange">Archive</span>
					</h1>
					<p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg md:text-xl leading-relaxed opacity-70 mt-10">
						A comprehensive engineering laboratory documenting professional ecosystems, architectural patterns, and high-performance digital solutions.
					</p>

                    {/* Functional Search Bar */}
                    <div className="mt-16 max-w-md mx-auto relative group">
                        <input 
                            type="text"
                            placeholder="Filter by technology or name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-12 py-5 text-sm font-bold placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-orange/40 transition-all outline-none text-gray-900 dark:text-white"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-600 group-focus-within:text-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
				</Motion.div>

				<div className="flex items-center gap-10 mb-20">
                    <div className="flex items-baseline gap-6">
					    <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none flex items-center gap-4">
						    Discovery <span className="text-gray-300 dark:text-[#1e293b]">Phase</span>
					    </h2>
                    </div>
					<div className="h-px grow bg-gray-100 dark:bg-white/5 relative hidden lg:block">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-6 pl-10 bg-white dark:bg-[#030712]">
                            <span className="text-[11px] font-black text-gray-300 dark:text-white/20 uppercase tracking-[0.5em] whitespace-nowrap">
                                {totalResults || projects.length || 0} TOTAL UNITS
                            </span>
                        </div>
                    </div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
					{filteredProjects.map((project, index) => (
						<Motion.div
							key={project._id}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.05, duration: 0.6 }}
							className="h-full"
						>
							<ProjectCard project={project} index={index + (page - 1) * limit} />
						</Motion.div>
					))}
				</div>

				{totalPages > 1 && !searchQuery && (
					<div className="mt-32 flex items-center justify-center gap-4">
						<button
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1}
							aria-label="Previous page"
							className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-white/40 disabled:opacity-5 disabled:cursor-not-allowed hover:bg-orange hover:border-orange hover:text-white transition-all shadow-xl"
						>
							<HiChevronLeft className="text-2xl" />
						</button>

						<div className="flex items-center gap-4">
							{getPageNumbers().map((p, i) => (
								p === "..." ? (
									<span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-300 dark:text-white/20 font-black">...</span>
								) : (
									<button
										key={p}
										onClick={() => setPage(p)}
										className={`w-16 h-16 rounded-full font-black text-xs transition-all shadow-2xl ${
											page === p
												? "bg-orange text-white"
												: "bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-white/40 border border-gray-100 dark:border-white/5 hover:border-orange hover:text-white"
										}`}
									>
										{p < 10 ? `0${p}` : p}
									</button>
								)
							))}
						</div>

						<button
							onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
							disabled={page === totalPages}
							aria-label="Next page"
							className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-white/40 disabled:opacity-5 disabled:cursor-not-allowed hover:bg-orange hover:border-orange hover:text-white transition-all shadow-xl"
						>
							<HiChevronRight className="text-2xl" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default PublicProjects;
