import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
    HiOutlineUser, 
    HiOutlineIdentification, 
    HiOutlineInformationCircle, 
    HiOutlineLink,
    HiOutlineCheck,
    HiOutlineUserCircle,
    HiOutlineDevicePhoneMobile,
    HiOutlineEnvelope
} from "react-icons/hi2";
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
	moreInfo: z.object({
		job: z.object({
			title: z.string().min(5, "Job title must be at least 5 characters"),
			note: z.string().min(20, "Job note must be at least 20 characters"),
		}),
		aboutMe: z.object({
			title: z.string().min(5, "About title must be at least 5 characters"),
			note: z.string().min(20, "About message must be at least 20 characters"),
		}),
		location: z.string().min(3, "Location is required"),
		available: z.boolean().default(true),
	}),
	github: z.string().url("Invalid URL").optional().or(z.literal("")),
	linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
	twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
	portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
	passwordCurrent: z.string().optional(),
	password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
	passwordConfirm: z.string().optional(),
});

const Profile = () => {
    const [activeTab, setActiveTab] = useState("account");
	const { user, isLoading: userLoading } = useCurrentUser();
	const { updateUser, isLoading: isUpdating } = useUpdateUser();

	// Transform user data for the form
	const defaultValues = user ? {
		...user,
		github: user.socialMedia?.find(s => s.name.toLowerCase() === 'github')?.url || "",
		linkedin: user.socialMedia?.find(s => s.name.toLowerCase() === 'linkedin')?.url || "",
		twitter: user.socialMedia?.find(s => s.name.toLowerCase() === 'twitter')?.url || "",
		portfolio: user.socialMedia?.find(s => s.name.toLowerCase() === 'portfolio')?.url || "",
	} : {};

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
        control,
        watch
	} = useForm({
		resolver: zodResolver(profileSchema),
		values: defaultValues,
	});

	const onSubmit = (data) => {
		const socialMedia = [
			{ name: 'LinkedIn', url: data.linkedin },
			{ name: 'GitHub', url: data.github },
			{ name: 'Twitter', url: data.twitter },
			{ name: 'Portfolio', url: data.portfolio },
		].filter(s => s.url);

		const payload = {
			name: data.name,
			email: data.email,
			phoneNumber: data.phoneNumber,
			moreInfo: { ...data.moreInfo },
			socialMedia
		};

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

    const tabs = [
        { id: "account", label: "Account", icon: HiOutlineUser },
        { id: "professional", label: "Professional", icon: HiOutlineIdentification },
        { id: "about", label: "About Me", icon: HiOutlineInformationCircle },
        { id: "social", label: "Social Media", icon: HiOutlineLink },
    ];

	return (
		<div className="max-w-6xl mx-auto pb-20">
            {/* Upper Profile Box (matches Image 5) */}
            <section className="bg-[#0b1120] rounded-[2.5rem] p-10 border border-white/5 mb-14 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-[#030712] flex items-center justify-center text-orange overflow-hidden border-4 border-white/5 shadow-2xl">
                            {user?.profileImg?.secure_url ? (
                                <img
                                    src={user.profileImg.secure_url}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <HiOutlineUserCircle className="text-8xl" />
                            )}
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange rounded-2xl shadow-2xl border-4 border-[#0b1120] flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                            <HiOutlineUserCircle className="text-2xl" />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-grow">
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                            {user?.name}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400">
                             <div className="flex items-center gap-2 px-4 py-1.5 bg-orange/10 border border-orange/20 rounded-full">
                                <HiOutlineEnvelope className="text-orange" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-orange">{user?.email}</span>
                             </div>
                             <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Admin</span>
                             </div>
                             <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Active Account</span>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs (matches top of Images 0-4) */}
            <div className="flex justify-center mb-10 px-4">
                <div className="inline-flex p-1.5 bg-[#0b1120] border border-white/5 rounded-full shadow-2xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden ${
                                activeTab === tab.id 
                                    ? "bg-orange/10 text-orange border border-orange/20" 
                                    : "text-white/40 hover:text-white"
                            }`}
                        >
                            <tab.icon className={`text-lg ${activeTab === tab.id ? "text-orange" : "text-white/20"}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="px-4">
                <AnimatePresence mode="wait">
                    <Motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {activeTab === "account" && <AccountSection register={register} errors={errors} isUpdating={isUpdating} isDirty={isDirty} />}
                            {activeTab === "professional" && <ProfessionalSection register={register} errors={errors} isUpdating={isUpdating} isDirty={isDirty} />}
                            {activeTab === "about" && <AboutSection register={register} errors={errors} isUpdating={isUpdating} isDirty={isDirty} />}
                            {activeTab === "social" && <SocialSection register={register} errors={errors} isUpdating={isUpdating} isDirty={isDirty} control={control} watch={watch} />}
                        </form>
                    </Motion.div>
                </AnimatePresence>
            </div>
		</div>
	);
};

export default Profile;
