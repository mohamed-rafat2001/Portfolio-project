import { useForm, useFieldArray } from "react-hook-form";
import { 
	HiOutlineUser, 
	HiOutlineEnvelope, 
	HiOutlineLockClosed, 
	HiOutlinePhoto,
	HiOutlineBriefcase,
	HiOutlineInformationCircle,
	HiOutlineLink,
	HiOutlineGlobeAlt,
	HiOutlinePhone,
	HiOutlineTrash,
	HiOutlinePlus,
	HiOutlineCamera
} from "react-icons/hi2";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { updateMe, updatePassword, updateProfileImg } from "../../../services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Profile = () => {
	const { user, isLoading: isUserLoading } = useCurrentUser();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = useState("general");
	const [subActiveTab, setSubActiveTab] = useState("account");

	const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
		values: user
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "infos.socialLinks"
	});

	const { register: registerPass, handleSubmit: handleSubmitPass, reset: resetPass, formState: { errors: passErrors } } = useForm();

	const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutation({
		mutationFn: updateMe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["User"] });
		}
	});

	const { mutate: changePassword, isLoading: isChangingPassword } = useMutation({
		mutationFn: updatePassword,
		onSuccess: () => {
			resetPass();
		}
	});

	const { mutate: changeProfileImg, isLoading: isUpdatingImg } = useMutation({
		mutationFn: updateProfileImg,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["User"] });
		}
	});

	if (isUserLoading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin"></div></div>;

	const onUpdateProfile = (data) => {
		updateProfile(data);
	};

	const onUpdatePassword = (data) => {
		changePassword({
			currentPassword: data.currentPassword,
			newPassword: data.newPassword,
			confirmPassword: data.confirmPassword
		});
	};

	const onUpdateImage = (e) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append("profileImg", file);
			changeProfileImg(formData);
		}
	};

	const mainTabs = [
		{ id: "general", label: "GENERAL" },
		{ id: "security", label: "SECURITY" },
	];

	const subTabs = [
		{ id: "account", label: "ACCOUNT", icon: HiOutlineUser },
		{ id: "professional", label: "PROFESSIONAL", icon: HiOutlineBriefcase },
		{ id: "about", label: "ABOUT ME", icon: HiOutlineInformationCircle },
		{ id: "social", label: "SOCIAL MEDIA", icon: HiOutlineLink },
	];

	return (
		<div className="space-y-10 max-w-6xl mx-auto pb-20">
			{/* Header */}
			<div className="space-y-2">
				<h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">PROFILE SETTINGS</h1>
				<p className="text-gray-500 dark:text-gray-400 font-medium">Manage your digital presence and account security.</p>
			</div>

			{/* Main Tabs Navigation */}
			<div className="flex items-center gap-10 border-b border-gray-100 dark:border-gray-800/50 pb-px">
				{mainTabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`relative py-4 text-xs font-black tracking-[0.2em] transition-all ${
							activeTab === tab.id
								? "text-orange"
								: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
						}`}
					>
						{tab.label}
						{activeTab === tab.id && (
							<Motion.div
								layoutId="activeTab"
								className="absolute bottom-0 left-0 right-0 h-1 bg-orange rounded-full"
							/>
						)}
					</button>
				))}
			</div>

			<AnimatePresence mode="wait">
				{activeTab === "general" ? (
					<Motion.div
						key="general"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="space-y-12"
					>
						{/* Overview Card */}
						<div className="bg-white dark:bg-[#0a0f1c] p-10 md:p-14 rounded-[3.5rem] border border-gray-100 dark:border-gray-800/50 shadow-sm relative overflow-hidden group">
							<div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
								{/* Profile Image with Upload */}
								<div className="relative group/avatar">
									<div className="w-48 h-48 rounded-[2.5rem] overflow-hidden border-8 border-gray-50 dark:border-[#030712] shadow-2xl relative">
										{isUpdatingImg ? (
											<div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
												<div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin" />
											</div>
										) : null}
										<img
											src={user?.infos?.profileImg?.secure_url || "/default-avatar.png"}
											alt={user?.name}
											className="w-full h-full object-cover grayscale group-hover/avatar:grayscale-0 transition-all duration-700"
										/>
									</div>
									<label className="absolute -bottom-2 -right-2 w-14 h-14 bg-orange text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-orange/40 cursor-pointer hover:scale-110 active:scale-95 transition-all z-20">
										<HiOutlineCamera className="text-2xl" />
										<input type="file" className="hidden" onChange={onUpdateImage} accept="image/*" />
									</label>
								</div>

								<div className="flex-1 space-y-6 text-center md:text-left">
									<div className="space-y-2">
										<h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{user?.name}</h2>
										<div className="flex items-center justify-center md:justify-start gap-3 text-gray-500 dark:text-gray-400 font-medium">
											<HiOutlineEnvelope className="text-lg text-orange" />
											{user?.email}
										</div>
									</div>
									<div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
										<span className="px-6 py-2 rounded-xl bg-orange/10 text-orange text-[10px] font-black uppercase tracking-widest border border-orange/20">
											ADMIN
										</span>
										<span className="px-6 py-2 rounded-xl bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20 flex items-center gap-2">
											<div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
											ACTIVE ACCOUNT
										</span>
									</div>
								</div>
							</div>
							
							{/* Background Decorative Element */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 blur-[100px] rounded-full -mr-32 -mt-32" />
						</div>

						{/* Sub Tabs Navigation */}
						<div className="bg-white dark:bg-[#0a0f1c] p-2 rounded-[2.5rem] flex flex-wrap gap-2 inline-flex border border-gray-100 dark:border-gray-800/30">
							{subTabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setSubActiveTab(tab.id)}
									className={`flex items-center gap-3 px-8 py-4 rounded-[1.8rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all ${
										subActiveTab === tab.id
											? "bg-[#030712] text-orange shadow-sm border border-gray-800/50"
											: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
									}`}
								>
									<tab.icon className={`text-lg ${subActiveTab === tab.id ? "text-orange" : "text-gray-400"}`} />
									{tab.label}
								</button>
							))}
						</div>

						{/* Sub Tab Content */}
						<div className="bg-white dark:bg-[#0a0f1c] p-10 md:p-14 rounded-[3.5rem] border border-gray-100 dark:border-gray-800/50 shadow-sm">
							<form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-12">
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
											{subTabs.find(t => t.id === subActiveTab)?.icon({ className: "text-2xl" })}
										</div>
										<h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange">
											{subActiveTab.replace("-", " ").toUpperCase()} INFORMATION
										</h2>
									</div>
									<button
										disabled={isUpdatingProfile}
										className="bg-orange text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 group flex items-center gap-3"
									>
										{isUpdatingProfile ? (
											<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										) : null}
										{isUpdatingProfile ? "UPDATING..." : "SAVE CHANGES"}
									</button>
								</div>

								<AnimatePresence mode="wait">
									{subActiveTab === "account" && (
										<Motion.div
											key="account"
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className="grid grid-cols-1 md:grid-cols-2 gap-12"
										>
											<div className="space-y-4">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Full Name</label>
												<div className="relative">
													<HiOutlineUser className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
													<input
														{...register("name", { required: "Name is required" })}
														className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
														placeholder="Your name"
													/>
												</div>
											</div>
											<div className="space-y-4">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Email Address</label>
												<div className="relative">
													<HiOutlineEnvelope className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
													<input
														{...register("email", { required: "Email is required" })}
														className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
														placeholder="Email"
													/>
												</div>
											</div>
											<div className="space-y-4">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Phone Number</label>
												<div className="relative">
													<HiOutlinePhone className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
													<input
														{...register("phone")}
														className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
														placeholder="+201050330514"
													/>
												</div>
											</div>
											<div className="space-y-4">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Availability Status</label>
												<div className="flex items-center gap-4 bg-gray-50 dark:bg-[#030712] p-6 rounded-[2rem] border border-transparent shadow-inner h-[74px]">
													<label className="relative inline-flex items-center cursor-pointer">
														<input 
															type="checkbox" 
															className="sr-only peer" 
															{...register("isAvailable")}
														/>
														<div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-orange"></div>
													</label>
													<span className="text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-widest text-[10px]">AVAILABLE FOR PROJECTS</span>
												</div>
											</div>
										</Motion.div>
									)}

									{subActiveTab === "professional" && (
										<Motion.div
											key="professional"
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className="grid grid-cols-1 md:grid-cols-2 gap-12"
										>
											<div className="space-y-4">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Job Title</label>
												<div className="relative">
													<HiOutlineUser className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
													<input
														{...register("infos.jobTitle")}
														className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
														placeholder="Full Stack Dev"
													/>
												</div>
											</div>
											<div className="space-y-4">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Location</label>
												<div className="relative">
													<HiOutlineGlobeAlt className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
													<input
														{...register("infos.location")}
														className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
														placeholder="Egypt"
													/>
												</div>
											</div>
											<div className="space-y-4 md:col-span-2">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Job Note</label>
												<div className="relative">
													<HiOutlineInformationCircle className="absolute left-8 top-8 text-gray-400 text-xl" />
													<textarea
														{...register("infos.jobNote")}
														rows={4}
														className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner resize-none"
														placeholder="A short note about your current role..."
													/>
												</div>
											</div>
										</Motion.div>
									)}

									{subActiveTab === "about" && (
										<Motion.div
											key="about"
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className="space-y-12"
										>
											<div className="space-y-4">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Section Title</label>
												<div className="relative">
													<HiOutlineInformationCircle className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
													<input
														{...register("infos.aboutMe.title")}
														className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
														placeholder="Hello, I'm Mohamed Rafat."
													/>
												</div>
											</div>
											<div className="space-y-4">
												<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Short Biography</label>
												<div className="relative">
													<HiOutlineInformationCircle className="absolute left-8 top-8 text-gray-400 text-xl" />
													<textarea
														{...register("infos.aboutMe.message")}
														rows={8}
														className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner resize-none"
														placeholder="Tell your story..."
													/>
												</div>
											</div>
										</Motion.div>
									)}

									{subActiveTab === "social" && (
										<Motion.div
											key="social"
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className="space-y-10"
										>
											<div className="flex items-center gap-4">
												<button
													type="button"
													onClick={() => append({ platform: "", url: "" })}
													className="w-12 h-12 rounded-2xl bg-[#030712] border border-gray-800/50 flex items-center justify-center text-gray-400 hover:text-orange hover:border-orange/30 transition-all"
												>
													<HiOutlinePlus className="text-xl" />
												</button>
												<span className="text-[10px] font-black uppercase tracking-widest text-gray-500">ADD SOCIAL LINK</span>
											</div>

											<div className="space-y-8">
												{fields.map((field, index) => (
													<div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end group">
														<div className="md:col-span-4 space-y-4">
															<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Platform</label>
															<div className="relative">
																<HiOutlineUser className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
																<input
																	{...register(`infos.socialLinks.${index}.platform`)}
																	className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
																	placeholder="LinkedIn"
																/>
															</div>
														</div>
														<div className="md:col-span-7 space-y-4">
															<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Profile URL</label>
															<div className="relative">
																<HiOutlineLink className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
																<input
																	{...register(`infos.socialLinks.${index}.url`)}
																	className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
																	placeholder="https://..."
																/>
															</div>
														</div>
														<div className="md:col-span-1 pb-4">
															<button
																type="button"
																onClick={() => remove(index)}
																className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
															>
																<HiOutlineTrash className="text-2xl" />
															</button>
														</div>
													</div>
												))}
											</div>
										</Motion.div>
									)}
								</AnimatePresence>
							</form>
						</div>
					</Motion.div>
				) : (
					<Motion.div
						key="security"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="bg-white dark:bg-[#0a0f1c] p-10 md:p-14 rounded-[3.5rem] border border-gray-100 dark:border-gray-800/50 shadow-sm"
					>
						<form onSubmit={handleSubmitPass(onUpdatePassword)} className="space-y-12">
							<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange">
										<HiOutlineLockClosed className="text-2xl" />
									</div>
									<h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange">
										PASSWORD MANAGEMENT
									</h2>
								</div>
								<button
									disabled={isChangingPassword}
									className="bg-orange text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 group flex items-center gap-3"
								>
									{isChangingPassword ? (
										<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									) : null}
									{isChangingPassword ? "UPDATING..." : "UPDATE PASSWORD"}
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
								<div className="space-y-4 md:col-span-2">
									<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Current Password</label>
									<div className="relative">
										<HiOutlineLockClosed className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
										<input
											type="password"
											{...registerPass("currentPassword", { required: true })}
											className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
											placeholder="••••••••"
										/>
									</div>
								</div>
								<div className="space-y-4">
									<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">New Password</label>
									<div className="relative">
										<HiOutlineLockClosed className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
										<input
											type="password"
											{...registerPass("newPassword", { required: true })}
											className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
											placeholder="••••••••"
										/>
									</div>
								</div>
								<div className="space-y-4">
									<label className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-400 ml-6">Confirm New Password</label>
									<div className="relative">
										<HiOutlineLockClosed className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
										<input
											type="password"
											{...registerPass("confirmPassword", { required: true })}
											className="w-full pl-16 pr-8 py-6 bg-gray-50 dark:bg-[#030712] border border-transparent focus:border-orange/30 rounded-[2rem] focus:ring-4 focus:ring-orange/5 transition-all text-sm font-bold dark:text-white placeholder:text-gray-400 shadow-inner"
											placeholder="••••••••"
										/>
									</div>
								</div>
							</div>
						</form>
					</Motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Profile;
