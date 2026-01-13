import { useForm } from "react-hook-form";
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlinePhoto } from "react-icons/hi2";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { updateMe, updatePassword, updateProfileImg } from "../../../services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion as Motion } from "framer-motion";
import { useState } from "react";

const Profile = () => {
	const { user, isLoading: isUserLoading } = useCurrentUser();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = useState("general");

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		values: user
	});

	const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutation({
		mutationFn: updateMe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["User"] });
		}
	});

	const { mutate: changePassword, isLoading: isChangingPassword } = useMutation({
		mutationFn: updatePassword,
		onSuccess: () => {
			reset();
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
		updateProfile({ name: data.name, email: data.email });
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

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Profile Settings</h1>
				<p className="text-gray-500 dark:text-gray-400 mt-2">Manage your account information and security.</p>
			</div>

			<div className="flex gap-4 border-b border-gray-100 dark:border-gray-800">
				{["general", "security"].map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`pb-4 px-2 font-black uppercase tracking-widest text-[10px] transition-all relative ${
							activeTab === tab ? "text-orange" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
						}`}
					>
						{tab}
						{activeTab === tab && (
							<Motion.div
								layoutId="activeTab"
								className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange"
							/>
						)}
					</button>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{activeTab === "general" ? (
					<>
						<div className="lg:col-span-1 space-y-6">
							<div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
								<div className="relative inline-block group">
									<div className="w-32 h-32 rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 mx-auto border-4 border-white dark:border-gray-950 shadow-xl">
										<img
											src={user?.profileImg || "/default-user.jpg"}
											alt={user?.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<label className="absolute -bottom-2 -right-2 p-3 bg-orange text-white rounded-2xl shadow-lg cursor-pointer hover:scale-110 transition-transform">
										<HiOutlinePhoto className="text-xl" />
										<input type="file" className="hidden" onChange={onUpdateImage} accept="image/*" />
									</label>
								</div>
								<div className="mt-6">
									<h3 className="font-black text-xl text-gray-900 dark:text-white uppercase">{user?.name}</h3>
									<p className="text-gray-500 text-sm mt-1">{user?.email}</p>
								</div>
							</div>
						</div>

						<div className="lg:col-span-2">
							<form onSubmit={handleSubmit(onUpdateProfile)} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Full Name</label>
										<div className="relative">
											<HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
											<input
												{...register("name", { required: "Name is required" })}
												className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
												placeholder="Your name"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Email Address</label>
										<div className="relative">
											<HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
											<input
												{...register("email", { required: "Email is required" })}
												className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
												placeholder="Email"
											/>
										</div>
									</div>
								</div>
								<div className="flex justify-end">
									<button
										disabled={isUpdatingProfile}
										className="bg-orange text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange/20 hover:scale-105 transition-all disabled:opacity-50"
									>
										{isUpdatingProfile ? "Updating..." : "Save Changes"}
									</button>
								</div>
							</form>
						</div>
					</>
				) : (
					<div className="lg:col-span-3">
						<form onSubmit={handleSubmit(onUpdatePassword)} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 max-w-2xl space-y-6">
							<div className="space-y-2">
								<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Current Password</label>
								<div className="relative">
									<HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
									<input
										type="password"
										{...register("currentPassword", { required: "Current password is required" })}
										className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
										placeholder="••••••••"
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">New Password</label>
									<div className="relative">
										<HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
										<input
											type="password"
											{...register("newPassword", { required: "New password is required" })}
											className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
											placeholder="••••••••"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label className="font-black uppercase tracking-widest text-[10px] text-gray-400 ml-4">Confirm Password</label>
									<div className="relative">
										<HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
										<input
											type="password"
											{...register("confirmPassword", { required: "Please confirm your password" })}
											className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-950 border-none rounded-2xl focus:ring-2 focus:ring-orange/20 transition-all text-sm"
											placeholder="••••••••"
										/>
									</div>
								</div>
							</div>
							<div className="flex justify-end">
								<button
									disabled={isChangingPassword}
									className="bg-orange text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange/20 hover:scale-105 transition-all disabled:opacity-50"
								>
									{isChangingPassword ? "Updating..." : "Update Password"}
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
