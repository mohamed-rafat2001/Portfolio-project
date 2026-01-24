
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Pagination = ({ page, totalResults, limit, setPage }) => {
	const totalPages = Math.ceil(totalResults / limit);

	if (totalPages <= 1) return null;

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

	return (
		<div className="mt-12 flex items-center justify-center gap-4 py-8">
			<button
				onClick={() => setPage((p) => Math.max(1, p - 1))}
				disabled={page === 1}
				className="w-10 h-10 rounded-xl bg-[#0a0f1c] border border-gray-800 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-orange/30 hover:text-orange transition-all"
			>
				<HiChevronLeft className="text-lg" />
			</button>

			<div className="flex items-center gap-2">
				{getPageNumbers().map((p, i) => (
					p === "..." ? (
						<span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-500 font-bold">...</span>
					) : (
						<button
							key={p}
							onClick={() => setPage(p)}
							className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
								page === p
									? "bg-orange text-white shadow-lg shadow-orange/20"
									: "bg-[#0a0f1c] text-gray-500 hover:text-white hover:border-gray-600 border border-gray-800"
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
				className="w-10 h-10 rounded-xl bg-[#0a0f1c] border border-gray-800 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-orange/30 hover:text-orange transition-all"
			>
				<HiChevronRight className="text-lg" />
			</button>
		</div>
	);
};

export default Pagination;
