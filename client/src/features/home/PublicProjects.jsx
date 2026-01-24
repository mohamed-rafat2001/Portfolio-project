import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Projects from "./components/Projects";
import useProjects from "../adminPanel/Projects/hooks/useProjects";
import LoadingState from "../../shared/components/ui/LoadingState";

const PublicProjects = () => {
	const [page, setPage] = useState(1);
	const limit = 6;
	const { projects, isLoading, totalResults } = useProjects({ page, limit });

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

	if (isLoading) return <LoadingState message="Fetching all projects..." />;

	return (
		<div className="min-h-screen pt-32 pb-24 bg-white dark:bg-gray-950">
			<div className="container mx-auto px-4">
				<Motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-20"
				>
					<h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
						Project <span className="text-orange">Archive</span>
					</h1>
					<p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium text-lg">
						A comprehensive collection of my professional work, personal experiments, and open-source contributions.
					</p>
				</Motion.div>

				<Projects 
					limit={limit} 
					isHomePage={false} 
					projects={projects} 
					isLoading={isLoading} 
				/>

				{totalPages > 1 && (
					<div className="mt-16 flex items-center justify-center gap-4">
						<button
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1}
							className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-900 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-orange/30 hover:text-orange transition-all"
						>
							<HiChevronLeft className="text-xl" />
						</button>

						<div className="flex items-center gap-2">
							{getPageNumbers().map((p, i) => (
								p === "..." ? (
									<span key={`ellipsis-${i}`} className="w-12 h-12 flex items-center justify-center text-gray-400 font-black">...</span>
								) : (
									<button
										key={p}
										onClick={() => setPage(p)}
										className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${
											page === p
												? "bg-orange text-white shadow-lg shadow-orange/20"
												: "bg-gray-50 dark:bg-gray-900 text-gray-400 hover:text-gray-900 dark:hover:text-white"
										}`}
									>
										{p}
									</button>
								)
							))}
						</div>

						<button
							onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
							disabled={page === totalPages}
							className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-900 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-orange/30 hover:text-orange transition-all"
						>
							<HiChevronRight className="text-xl" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default PublicProjects;
