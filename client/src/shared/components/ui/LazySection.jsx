import { useRef, useState, useEffect } from "react";

const LazySection = ({ children, offset = "200px" }) => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{
				rootMargin: offset,
			}
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, [offset]);

	return (
		<div ref={sectionRef} className="min-h-[100px]">
			{isVisible ? children : <div className="h-screen" />}
		</div>
	);
};

export default LazySection;
