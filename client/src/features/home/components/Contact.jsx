import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import useCreateEmail from "../../adminPanel/Emails/hooks/useCreateEmail";
import { motion as Motion } from "framer-motion";
import {
	HiPaperAirplane,
	HiEnvelope,
	HiPhone,
	HiMapPin,
} from "react-icons/hi2";
import {
	FaLinkedin,
	FaGithub,
	FaTwitter,
	FaInstagram,
	FaFacebook,
	FaGlobe,
} from "react-icons/fa";

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
};

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

const contactSchema = z.object({
	userName: z.string().min(3, "Name must be at least 3 characters"),
	userEmail: z.string().email("Please enter a valid email"),
	phoneNumber: z.string().optional(),
	subject: z.string().optional(),
	emailBody: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = ({ user }) => {
	const { createEmail, isLoading } = useCreateEmail();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(contactSchema),
		mode: "onChange",
	});

	const onSubmit = (data) => {
		createEmail(data, {
			onSuccess: () => {
				toast.success("Message sent successfully!");
				reset();
			},
			onError: () => {
				toast.error("Failed to send message. Please try again.");
			},
		});
	};

	return (
		<Motion.section
			id="contact"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-16">
					<span className="text-orange font-black text-sm uppercase tracking-[0.3em]">
						05
					</span>
					<div className="h-[1px] grow bg-gray-200 dark:bg-gray-800"></div>
					<h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
						Get In Touch
					</h2>
				</div>

				<div className="max-w-5xl mx-auto">
					<div className="text-center space-y-4 mb-16">
						<h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
							Let's Work Together
						</h3>
						<p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm font-medium leading-relaxed">
							Have a project in mind or just want to say hi? Feel free to reach
							out and let's build something amazing together.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
						{/* Contact Info */}
						<div className="lg:col-span-5 space-y-10">
							<div className="space-y-8">
								<div className="flex items-center gap-6 group">
									<div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-xl shadow-black/5 flex items-center justify-center text-orange group-hover:scale-110 transition-transform border border-gray-100 dark:border-gray-700 shrink-0">
										<HiEnvelope className="text-xl" aria-hidden="true" />
									</div>
									<div className="min-w-0">
										<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
											Email Me
										</p>
										<a href={`mailto:${user?.email || "mohamed20rafat@gmail.com"}`} className="text-sm font-bold text-[#1a1a1a] dark:text-white hover:text-orange transition-colors truncate block">
											{user?.email || "mohamed20rafat@gmail.com"}
										</a>
									</div>
								</div>

								<div className="flex items-center gap-6 group">
									<div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-xl shadow-black/5 flex items-center justify-center text-orange group-hover:scale-110 transition-transform border border-gray-100 dark:border-gray-700 shrink-0">
										<HiPhone className="text-xl" aria-hidden="true" />
									</div>
									<div className="min-w-0">
										<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
											Call Me
										</p>
										<a href={`tel:${user?.phoneNumber || "+201050330514"}`} className="text-sm font-bold text-[#1a1a1a] dark:text-white hover:text-orange transition-colors truncate block">
											{user?.phoneNumber || "+20 1050330514"}
										</a>
									</div>
								</div>

								<div className="flex items-center gap-6 group">
									<div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-xl shadow-black/5 flex items-center justify-center text-orange group-hover:scale-110 transition-transform border border-gray-100 dark:border-gray-700 shrink-0">
										<HiMapPin className="text-xl" aria-hidden="true" />
									</div>
									<div className="min-w-0">
										<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
											Location
										</p>
										<p className="text-sm font-bold text-[#1a1a1a] dark:text-white truncate block">
											{user?.infos?.location || "Egypt"}
										</p>
									</div>
								</div>
							</div>

							{/* Social Media Links */}
							{user?.infos?.socialMedia?.length > 0 && (
								<div className="pt-10 border-t border-gray-200 dark:border-gray-800">
									<p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
										Follow My Work
									</p>
									<div className="flex flex-wrap gap-4">
										{user.infos.socialMedia.map((social) => (
											<a
												key={social._id}
												href={social.url}
												target="_blank"
												rel="noreferrer"
												className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-orange hover:border-orange/30 hover:shadow-xl hover:shadow-orange/10 transition-all group"
												title={social.name}
											>
												<span className="text-xl group-hover:scale-110 transition-transform">
													{getIcon(social.name)}
												</span>
											</a>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Contact Form */}
						<div className="lg:col-span-7">
							<div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/3 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
								<div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
								
								<form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
												Your Name
											</label>
											<input
												{...register("userName")}
												type="text"
												placeholder="John Doe"
												className={`w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${errors.userName ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} focus:border-orange/30 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all text-sm font-medium`}
											/>
											{errors.userName && (
												<p className="text-[10px] text-red-500 ml-4 font-bold uppercase tracking-widest">{errors.userName.message}</p>
											)}
										</div>
										<div className="space-y-2">
											<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
												Your Email
											</label>
											<input
												{...register("userEmail")}
												type="email"
												placeholder="john@example.com"
												className={`w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${errors.userEmail ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} focus:border-orange/30 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all text-sm font-medium`}
											/>
											{errors.userEmail && (
												<p className="text-[10px] text-red-500 ml-4 font-bold uppercase tracking-widest">{errors.userEmail.message}</p>
											)}
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
												Phone Number
											</label>
											<input
												{...register("phoneNumber")}
												type="tel"
												placeholder="+20 10..."
												className={`w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} focus:border-orange/30 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all text-sm font-medium`}
											/>
											{errors.phoneNumber && (
												<p className="text-[10px] text-red-500 ml-4 font-bold uppercase tracking-widest">{errors.phoneNumber.message}</p>
											)}
										</div>
										<div className="space-y-2">
											<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
												Subject
											</label>
											<input
												{...register("subject")}
												type="text"
												placeholder="Project Inquiry"
												className={`w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${errors.subject ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} focus:border-orange/30 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all text-sm font-medium`}
											/>
											{errors.subject && (
												<p className="text-[10px] text-red-500 ml-4 font-bold uppercase tracking-widest">{errors.subject.message}</p>
											)}
										</div>
									</div>

									<div className="space-y-2">
										<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
											Message
										</label>
										<textarea
											{...register("emailBody")}
											rows="4"
											placeholder="Tell me about your project..."
											className={`w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${errors.emailBody ? 'border-red-500' : 'border-gray-100 dark:border-gray-800'} focus:border-orange/30 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-all text-sm font-medium resize-none`}
										></textarea>
										{errors.emailBody && (
											<p className="text-[10px] text-red-500 ml-4 font-bold uppercase tracking-widest">{errors.emailBody.message}</p>
										)}
									</div>

									<button 
										disabled={isLoading}
										className="w-full py-5 bg-orange text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange/20 active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isLoading ? "Sending..." : "Send Message"}
										{!isLoading && <HiPaperAirplane className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Motion.section>
	);
};

export default Contact;
