import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

const ProjectPagination = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-center gap-2 mt-12">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 disabled:opacity-30 hover:border-orange/30 transition-all"
			>
				<HiOutlineChevronLeft className="text-xl" />
			</button>

			<div className="flex items-center gap-2">
				{[...Array(totalPages)].map((_, i) => (
					<button
						key={i + 1}
						onClick={() => onPageChange(i + 1)}
						className={`w-12 h-12 rounded-xl font-black text-sm transition-all ${
							currentPage === i + 1
								? "bg-orange text-white shadow-lg shadow-orange/20"
								: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 hover:border-orange/30"
						}`}
					>
						{i + 1}
					</button>
				))}
			</div>

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 disabled:opacity-30 hover:border-orange/30 transition-all"
			>
				<HiOutlineChevronRight className="text-xl" />
			</button>
		</div>
	);
};

export default ProjectPagination;
