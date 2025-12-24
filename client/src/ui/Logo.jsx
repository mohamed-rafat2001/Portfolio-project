import { HiCodeBracket } from "react-icons/hi2";
import { motion as Motion } from "framer-motion";

const Logo = ({
	className = "",
	iconSize = "text-2xl md:text-3xl",
	textSize = "text-xl md:text-2xl",
}) => {
	return (
		<a href="#home" className={`flex items-center gap-2 group ${className}`}>
			<Motion.div
				initial={{ rotate: -10 }}
				animate={{ rotate: 0 }}
				whileHover={{ scale: 1.1, rotate: 5 }}
				whileTap={{ scale: 0.9 }}
				transition={{ duration: 0.3 }}
			>
				<HiCodeBracket className={`${iconSize} text-orange`} />
			</Motion.div>
			<h1
				className={`${textSize} font-extrabold tracking-tight text-gray-900 dark:text-white uppercase`}
			>
				MOHAMED <span className="text-orange">RAFAT</span>
			</h1>
		</a>
	);
};

export default Logo;
