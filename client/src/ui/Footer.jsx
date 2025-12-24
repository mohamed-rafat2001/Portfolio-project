const Footer = () => {
	return (
		<footer className="border-t border-gray-200 dark:border-gray-800 py-8 bg-white dark:bg-gray-900 transition-colors duration-300">
			<div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
				<p>© {new Date().getFullYear()} MOHAMED RAFAT. All rights reserved.</p>
			</div>
		</footer>
	);
};
export default Footer;
