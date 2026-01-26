
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Pagination = ({ page, totalResults, limit, setPage, size = "default" }) => {
	const totalPages = Math.ceil(totalResults / limit);

	if (totalPages <= 1) return null;

	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = size === "small" ? 3 : 5;
		
		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (page <= (size === "small" ? 2 : 3)) {
				for (let i = 1; i <= (size === "small" ? 3 : 4); i++) pages.push(i);
				pages.push("...");
				pages.push(totalPages);
			} else if (page >= totalPages - (size === "small" ? 1 : 2)) {
				pages.push(1);
				pages.push("...");
				for (let i = totalPages - (size === "small" ? 2 : 3); i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				pages.push("...");
				if (size !== "small") pages.push(page - 1);
				pages.push(page);
				if (size !== "small") pages.push(page + 1);
				pages.push("...");
				pages.push(totalPages);
			}
		}
		return pages;
	};

	const containerClasses = size === "small" 
		? "mt-4 flex items-center justify-center gap-2 py-2" 
		: "mt-12 flex items-center justify-center gap-4 py-8";

	const buttonClasses = size === "small"
		? "w-8 h-8 rounded-lg"
		: "w-10 h-10 rounded-xl";

    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, totalResults);

	return (
		<div className={`${containerClasses} ${size === "small" ? "flex-col" : "flex-col sm:flex-row"} items-center gap-6`}>
            {totalResults > 0 && (
                <div className={`text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 whitespace-nowrap ${size === "small" ? "mb-1" : ""}`}>
                    Showing <span className="text-gray-900 dark:text-white">{startItem}-{endItem}</span> of <span className="text-gray-900 dark:text-white">{totalResults}</span> items
                </div>
            )}

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`${buttonClasses} bg-white dark:bg-[#0a0f1c] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-900 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-orange/30 hover:text-orange transition-all shadow-sm dark:shadow-none`}
                >
                    <HiChevronLeft className={size === "small" ? "text-base" : "text-lg"} />
                </button>

                <div className={`flex items-center ${size === "small" ? "gap-1" : "gap-2"}`}>
                    {getPageNumbers().map((p, i) => (
                        p === "..." ? (
                            <span key={`ellipsis-${i}`} className={`${buttonClasses} flex items-center justify-center text-gray-500 font-bold text-[10px]`}>...</span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`${buttonClasses} font-bold text-[10px] transition-all ${
                                    page === p
                                        ? "bg-orange text-white shadow-lg shadow-orange/20 border-orange"
                                        : "bg-white dark:bg-[#0a0f1c] text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none"
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
                    className={`${buttonClasses} bg-white dark:bg-[#0a0f1c] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-900 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-orange/30 hover:text-orange transition-all shadow-sm dark:shadow-none`}
                >
                    <HiChevronRight className={size === "small" ? "text-base" : "text-lg"} />
                </button>
            </div>
		</div>
	);
};

export default Pagination;
