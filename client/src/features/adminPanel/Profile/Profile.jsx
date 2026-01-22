import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion as Motion } from "framer-motion";
import { HiOutlineCheck, HiOutlineUserCircle } from "react-icons/hi2";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import useUpdateUser from "./hooks/useUpdateUser";
import AccountSection from "./components/AccountSection";
import AboutSection from "./components/AboutSection";
import ProfessionalSection from "./components/ProfessionalSection";
import SocialSection from "./components/SocialSection";
import SecuritySection from "./components/SecuritySection";
import LoadingState from "../../../shared/components/ui/LoadingState";

const profileSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	email: z.string().email("Invalid email address"),
	phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
	infos: z.object({
		job: z.object({
			title: z.string().min(5, "Job title must be at least 5 characters"),
			note: z.string().min(20, "Job note must be at least 20 characters"),
		}),
		aboutMe: z.object({
			title: z.string().min(5, "About title must be at least 5 characters"),
			message: z.string().min(20, "About message must be at least 20 characters"),
		}),
		location: z.string().min(3, "Location is required"),
		available: z.boolean().default(true),
	}),
	// Social media handled separately in transformation
	github: z.string().url("Invalid URL").optional().or(z.literal("")),
	linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
	twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
	portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
	passwordCurrent: z.string().optional(),
	password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
	passwordConfirm: z.string().optional(),
});

const Profile = () => {
	const { user, isLoading: userLoading } = useCurrentUser();
	const { updateUser, isLoading: isUpdating } = useUpdateUser();

	// Transform user data for the form
	const defaultValues = user ? {
		...user,
		github: user.infos?.socialMedia?.find(s => s.name.toLowerCase() === 'github')?.url || "",
		linkedin: user.infos?.socialMedia?.find(s => s.name.toLowerCase() === 'linkedin')?.url || "",
		twitter: user.infos?.socialMedia?.find(s => s.name.toLowerCase() === 'twitter')?.url || "",
		portfolio: user.infos?.socialMedia?.find(s => s.name.toLowerCase() === 'portfolio')?.url || "",
	} : {};

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm({
		resolver: zodResolver(profileSchema),
		values: defaultValues,
	});

	const onSubmit = (data) => {
		// Transform data back for the backend
		const socialMedia = [
			{ name: 'GitHub', url: data.github },
			{ name: 'LinkedIn', url: data.linkedin },
			{ name: 'Twitter', url: data.twitter },
			{ name: 'Portfolio', url: data.portfolio },
		].filter(s => s.url);

		const payload = {
			name: data.name,
			email: data.email,
			phoneNumber: data.phoneNumber,
			infos: {
				...data.infos,
				socialMedia
			}
		};

		// If password is being changed
		if (data.password) {
			payload.passwordCurrent = data.passwordCurrent;
			payload.password = data.password;
			payload.passwordConfirm = data.passwordConfirm;
		}

		updateUser(payload, {
			onSuccess: () => reset(data),
		});
	};

	if (userLoading) return <LoadingState message="Loading your profile..." />;

	return (
		<div className="max-w-5xl mx-auto space-y-12">
			{/* Header */}
			<section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
				<div className="flex items-center gap-6">
					<div className="relative group">
						<div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-orange/10 flex items-center justify-center text-orange overflow-hidden border-4 border-white dark:border-gray-950 shadow-xl">
							{user?.infos?.profileImg?.secure_url ? (
								<img
									src={user.infos.profileImg.secure_url}
									alt={user.name}
									className="w-full h-full object-cover"
								/>
							) : (
								<HiOutlineUserCircle className="text-6xl md:text-8xl" />
							)}
						</div>
						<button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center justify-center text-orange hover:scale-110 transition-transform cursor-pointer">
							<HiOutlineUserCircle className="text-xl" />
						</button>
					</div>
					<div>
						<Motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="flex items-center gap-3 mb-2"
						>
							<span className="text-xs font-black uppercase tracking-widest text-orange bg-orange/5 px-3 py-1 rounded-full border border-orange/10">
								Admin Profile
							</span>
						</Motion.div>
						<h1 className="text-4xl font-black text-gray-900 dark:text-white">
							{user?.name}
						</h1>
						<p className="text-gray-500 dark:text-gray-400 font-medium">
							{user?.infos?.job?.title || "Portfolio Administrator"}
						</p>
					</div>
				</div>

				<Motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={handleSubmit(onSubmit)}
					disabled={!isDirty || isUpdating}
					className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-orange/20 cursor-pointer ${
						isDirty && !isUpdating
							? "bg-orange text-white hover:bg-orange/90"
							: "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
					}`}
				>
					{isUpdating ? (
						<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
					) : (
						<HiOutlineCheck className="text-xl" />
					)}
					Save Changes
				</Motion.button>
			</section>

			<form className="grid grid-cols-1 lg:grid-cols-2 gap-8" onSubmit={e => e.preventDefault()}>
				<AccountSection register={register} errors={errors} />
				<AboutSection register={register} errors={errors} />
				<ProfessionalSection register={register} errors={errors} />
				<SocialSection register={register} errors={errors} />
				<div className="lg:col-span-2">
					<SecuritySection register={register} errors={errors} />
				</div>
			</form>
		</div>
	);
};

export default Profile;
