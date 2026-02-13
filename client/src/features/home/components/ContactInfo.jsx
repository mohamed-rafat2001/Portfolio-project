import { HiEnvelope, HiPhone, HiMapPin } from "react-icons/hi2";
import {
	FaLinkedin,
	FaGithub,
	FaTwitter,
	FaInstagram,
	FaFacebook,
	FaGlobe,
} from "react-icons/fa";
import useAdminInfo from "../../../shared/hooks/useAdminInfo";
import LoadingState from "../../../shared/components/ui/LoadingState";

const getIcon = (name) => {
	const lowerName = name.toLowerCase();
	if (lowerName.includes("github")) return <FaGithub />;
	if (lowerName.includes("linkedin")) return <FaLinkedin />;
	if (lowerName.includes("twitter") || lowerName.includes("x"))
		return <FaTwitter />;
	if (lowerName.includes("instagram")) return <FaInstagram />;
	if (lowerName.includes("facebook")) return <FaFacebook />;
	return <FaGlobe />;
};

const ContactInfo = () => {
	const { admin, isLoading } = useAdminInfo();

	if (isLoading) return <LoadingState message="Loading contact info..." />;

	return (
		<div className="lg:col-span-5 space-y-12">
			<div className="space-y-10">
				<div className="flex items-center gap-8 group">
					<div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-all duration-300 shadow-xl shrink-0">
						<HiEnvelope className="text-2xl" aria-hidden="true" />
					</div>
					<div className="min-w-0">
						<p className="text-[11px] font-black text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">
							Email Me
						</p>
						<a
							href={`mailto:${admin?.email || "mohamed20rafat@gmail.com"}`}
							className="text-base font-bold text-gray-900 dark:text-white hover:text-orange transition-colors truncate block"
						>
							{admin?.email || "mohamed20rafat@gmail.com"}
						</a>
					</div>
				</div>

				<div className="flex items-center gap-8 group">
					<div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-all duration-300 shadow-xl shrink-0">
						<HiPhone className="text-2xl" aria-hidden="true" />
					</div>
					<div className="min-w-0">
						<p className="text-[11px] font-black text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">
							Call Me
						</p>
						<a
							href={`tel:${admin?.phoneNumber || "+201050330514"}`}
							className="text-base font-bold text-gray-900 dark:text-white hover:text-orange transition-colors truncate block"
						>
							{admin?.phoneNumber || "+201050330514"}
						</a>
					</div>
				</div>

				<div className="flex items-center gap-8 group">
					<div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-all duration-300 shadow-xl shrink-0">
						<HiMapPin className="text-2xl" aria-hidden="true" />
					</div>
					<div className="min-w-0">
						<p className="text-[11px] font-black text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-2">
							Location
						</p>
						<p className="text-base font-bold text-gray-900 dark:text-white truncate block">
							{admin?.moreInfo?.location || "Egypt"}
						</p>
					</div>
				</div>
			</div>

			<div className="pt-12 border-t border-gray-100 dark:border-gray-800/50">
				<p className="text-[11px] font-black text-gray-700 dark:text-gray-400 uppercase tracking-[0.4em] mb-8">
					Follow My Work
				</p>
				<div className="flex flex-wrap gap-5">
					{admin?.socialMedia?.length > 0 ? (
						admin.socialMedia.map((social) => (
							<a
								key={social._id}
								href={social.url}
								target="_blank"
								rel="noreferrer"
								className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-400 hover:text-white hover:bg-orange hover:border-orange transition-all duration-300 group shadow-xl"
								title={social.name}
							>
								<span className="text-2xl transition-transform group-hover:scale-110">
									{getIcon(social.name)}
								</span>
							</a>
						))
					) : (
						<>
							<a
								href="#"
								className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-orange hover:border-orange transition-all duration-300 group shadow-xl"
							>
								<FaLinkedin className="text-2xl transition-transform group-hover:scale-110" />
							</a>
							<a
								href="#"
								className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-orange hover:border-orange transition-all duration-300 group shadow-xl"
							>
								<FaGithub className="text-2xl transition-transform group-hover:scale-110" />
							</a>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
