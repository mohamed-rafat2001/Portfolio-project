import { BeatLoader } from "react-spinners";

const ButtonLoader = ({ color = "#ffffff", size = 8 }) => {
	return (
		<span className="flex items-center justify-center">
			<BeatLoader color={color} size={size} />
		</span>
	);
};

export default ButtonLoader;