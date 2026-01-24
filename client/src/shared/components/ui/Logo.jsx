import { HiCodeBracket } from "react-icons/hi2";
import { motion as Motion } from "framer-motion";
import useAdminInfo from "../hooks/useAdminInfo";

const Logo = ({
	className = "",
	iconSize = "text-2xl md:text-3xl",
	textSize = "text-xl md:text-2xl",
}) => {
	const { admin } = useAdminInfo();

	const nameParts = admin?.name?.split(" ") || ["MOHAMED", "RAFAT"];
	const firstName = nameParts[0];
	const lastName = nameParts.slice(1).join(" ");

	return (
		<div className={`flex items-center group ${className} ${textSize === "hidden" ? "gap-0" : "gap-2"}`}>
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
				{firstName} <span className="text-orange">{lastName}</span>
			</h1>
		</div>
	);
};

export default Logo;
