import { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi2";
import { m as Motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled up to given distance
	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	// Set the top scroll position
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<Motion.button
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.5 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-orange text-white shadow-lg shadow-orange/20 hover:shadow-orange/40 transition-shadow duration-300 cursor-pointer"
					aria-label="Scroll to top"
				>
					<HiArrowUp className="text-2xl" />
				</Motion.button>
			)}
		</AnimatePresence>
	);
};

export default ScrollToTop;
