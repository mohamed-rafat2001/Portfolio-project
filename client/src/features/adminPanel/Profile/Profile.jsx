import { useState, useRef, useEffect } from "react";
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
    HiOutlineEnvelope,
    HiOutlineLockClosed,
    HiOutlineCamera,
    HiOutlineEye
} from "react-icons/hi2";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import useUpdateUser from "./hooks/useUpdateUser";
import AccountSection from "./components/AccountSection";
import AboutSection from "./components/AboutSection";
import ProfessionalSection from "./components/ProfessionalSection";
import SocialSection from "./components/SocialSection";
import SecuritySection from "./components/SecuritySection";
import LoadingState from "../../../shared/components/ui/LoadingState";
import ProfileImageModal from "./components/ProfileImageModal";
import Modal from "../../../shared/components/ui/Modal";

const profileSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	email: z.string().email("Invalid email address"),
	phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
    location: z.string().min(2, "Location is required"),
    aboutMe: z.string().optional(),
	infos: z.object({
		job: z.object({
			title: z.string().min(3, "Job title must be at least 3 characters"),
			note: z.string().min(10, "Job note must be at least 10 characters"),
		}),
		aboutMe: z.object({
			title: z.string().min(3, "About title must be at least 3 characters"),
			message: z.string().min(10, "About message must be at least 10 characters"),
		}),
		available: z.boolean().default(true),
	}),
    socialMedia: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        url: z.string().url("Invalid URL"),
    })).optional().default([]),
	passwordCurrent: z.string().optional(),
	password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
	confirmPassword: z.string().optional(),
});

const Profile = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isImageDropdownOpen, setIsImageDropdownOpen] = useState(false);
    const [isViewPhotoOpen, setIsViewPhotoOpen] = useState(false);
    const dropdownRef = useRef(null);
	const { user, isLoading: userLoading } = useCurrentUser();
	const { updateUser, isLoading: isUpdating } = useUpdateUser();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsImageDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

	// Transform user data for the form
	const defaultValues = user ? {
		...user,
        password: "",
        passwordCurrent: "",
        confirmPassword: "",
        infos: {
            ...user.infos,
            aboutMe: {
                title: user.infos?.aboutMe?.title || "",
                message: user.infos?.aboutMe?.message || "",
            }
        },
        socialMedia: user.socialMedia || [],
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
		const payload = {
			name: data.name,
			email: data.email,
			phoneNumber: data.phoneNumber,
            location: data.location,
            aboutMe: data.aboutMe,
			infos: { ...data.infos },
			socialMedia: data.socialMedia
		};

		if (data.password) {
			payload.passwordCurrent = data.passwordCurrent;
			payload.password = data.password;
			payload.confirmPassword = data.confirmPassword;
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
        { id: "security", label: "Security", icon: HiOutlineLockClosed },
    ];

	return (
		<div className="max-w-6xl mx-auto pb-20">
            {/* Upper Profile Box */}
            <section className="bg-[#0b1120] rounded-[2.5rem] p-10 border border-white/5 mb-14 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="relative group" ref={dropdownRef}>
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
                        <button 
                            onClick={() => setIsImageDropdownOpen(!isImageDropdownOpen)}
                            className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange rounded-2xl shadow-2xl border-4 border-[#0b1120] flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
                        >
                            <HiOutlineCamera className="text-2xl" />
                        </button>

                        <AnimatePresence>
                            {isImageDropdownOpen && (
                                <Motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-56 bg-[#030712] border border-white/10 rounded-3xl shadow-3xl p-3 z-50 overflow-hidden"
                                >
                                    <button 
                                        onClick={() => {
                                            setIsImageModalOpen(true);
                                            setIsImageDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 rounded-2xl transition-colors text-white group"
                                    >
                                        <HiOutlineCamera className="text-xl text-orange group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (user?.profileImg?.secure_url) {
                                                setIsViewPhotoOpen(true);
                                                setIsImageDropdownOpen(false);
                                            }
                                        }}
                                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 rounded-2xl transition-colors text-white group"
                                    >
                                        <HiOutlineEye className="text-xl text-blue-500 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">View Photo</span>
                                    </button>
                                </Motion.div>
                            )}
                        </AnimatePresence>
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

            {/* Navigation Tabs */}
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
                            {activeTab === "security" && <SecuritySection register={register} errors={errors} isUpdating={isUpdating} isDirty={isDirty} />}
                        </form>
                    </Motion.div>
                </AnimatePresence>
            </div>

            <ProfileImageModal 
                isOpen={isImageModalOpen} 
                onClose={() => setIsImageModalOpen(false)} 
            />

            <Modal
                isOpen={isViewPhotoOpen}
                onClose={() => setIsViewPhotoOpen(false)}
                title="Profile Photo"
                maxWidth="max-w-2xl"
            >
                <div className="p-2.5 bg-[#030712] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                    <img 
                        src={user?.profileImg?.secure_url} 
                        alt={user?.name} 
                        className="w-full h-full object-contain rounded-[2.2rem]"
                        crossOrigin="anonymous"
                    />
                </div>
            </Modal>
		</div>
	);
};

export default Profile;
