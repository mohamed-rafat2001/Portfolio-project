import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HiOutlineEnvelope } from "react-icons/hi2";
import useEmails from "./hooks/useEmails";
import useUpdateEmailStatus from "./hooks/useUpdateEmailStatus";
import useDeleteEmail from "./hooks/useDeleteEmail";
import EmailCard from "./components/EmailCard";
import EmailDetails from "./components/EmailDetails";
import Modal from "../../../shared/components/ui/Modal";
import AdminHeader from "../../../shared/components/ui/AdminHeader";
import LoadingState from "../../../shared/components/ui/LoadingState";

const Emails = () => {
	const { emails, isLoading } = useEmails();
	const { mutate: updateStatus } = useUpdateEmailStatus();
	const { mutate: deleteEmail } = useDeleteEmail();

	const [selectedEmail, setSelectedEmail] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEmailClick = (email) => {
		setSelectedEmail(email);
		setIsModalOpen(true);
		if (!email.isRead) {
			updateStatus({ id: email._id, data: { isRead: true } });
		}
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this email?")) {
			deleteEmail(id);
		}
	};

	if (isLoading) return <LoadingState message="Loading emails..." />;

	const unreadCount = emails?.filter((e) => !e.isRead).length || 0;

	return (
<<<<<<< HEAD
		<div className="h-[calc(100vh-180px)] flex flex-col space-y-8">
			<div>
				<h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">EMAILS</h1>
				<p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage inquiries received through the contact form.</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow overflow-hidden">
				{/* Email List */}
								<div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
					{emails?.length === 0 ? (
						<div className="text-center py-20 bg-white dark:bg-[#0a0f1c] rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50">
							<div className="w-16 h-16 bg-gray-50 dark:bg-[#030712] rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-300 dark:text-gray-800 shadow-inner">
								<HiOutlineEnvelope className="text-3xl" />
							</div>
							<p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">No messages yet</p>
						</div>
					) : (
						emails?.map((email) => (
							<Motion.div
								key={email._id}
								layout
								onClick={() => setSelectedEmail(email)}
								className={`group p-8 rounded-[2.5rem] border cursor-pointer transition-all relative overflow-hidden ${
									selectedEmail?._id === email._id
										? "bg-orange border-orange shadow-2xl shadow-orange/30 text-white translate-x-2"
										: "bg-white dark:bg-[#0a0f1c] border-gray-100 dark:border-gray-800/50 text-gray-900 dark:text-white hover:border-orange/30 hover:bg-gray-50 dark:hover:bg-[#030712]"
								}`}
							>
								<div className="flex justify-between items-start relative z-10">
									<div className="space-y-2 pr-8">
										<div className="flex items-center gap-3">
											<div className={`w-2.5 h-2.5 rounded-full ${selectedEmail?._id === email._id ? "bg-white" : "bg-orange"}`} />
											<h3 className="font-black uppercase tracking-tight truncate max-w-[150px] text-sm">{email.userName || email.name}</h3>
										</div>
										<p className={`text-[10px] font-black uppercase tracking-widest truncate ${selectedEmail?._id === email._id ? "text-white/80" : "text-gray-500"}`}>
											{email.userEmail || email.email}
										</p>
									</div>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDelete(email._id);
										}}
										className={`p-3 rounded-xl transition-all ${
											selectedEmail?._id === email._id
												? "hover:bg-white/20 text-white"
												: "hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
										}`}
									>
										<HiOutlineTrash className="text-base" />
									</button>
								</div>
								<div className={`flex items-center gap-2 mt-6 text-[9px] font-black uppercase tracking-[0.2em] relative z-10 ${
									selectedEmail?._id === email._id ? "text-white/60" : "text-gray-400"
								}`}>
									<HiOutlineClock className="text-xs" />
									{new Date(email.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
								</div>
								
								{selectedEmail?._id === email._id && (
									<Motion.div 
										layoutId="active-glow"
										className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 blur-2xl rounded-full"
									/>
								)}
							</Motion.div>
						))
					)}
=======
		<div className="space-y-8">
			<AdminHeader
				title="Inbox"
				description={
					unreadCount > 0
						? `You have ${unreadCount} unread messages`
						: "All caught up! No new messages"
				}
				icon={<HiOutlineEnvelope />}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				<AnimatePresence mode="popLayout">
					{emails?.map((email) => (
						<EmailCard
							key={email._id}
							email={email}
							onClick={handleEmailClick}
							onDelete={handleDelete}
						/>
					))}
				</AnimatePresence>
			</div>

			{emails?.length === 0 && (
				<div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800">
					<div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-gray-400 text-3xl mx-auto mb-6">
						<HiOutlineEnvelope />
					</div>
					<h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
						No emails yet
					</h3>
					<p className="text-gray-500 dark:text-gray-400">
						Messages from your contact form will appear here
					</p>
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
				</div>
			)}

<<<<<<< HEAD
				{/* Email Content */}
				<div className="lg:col-span-8 overflow-hidden h-full">
					<AnimatePresence mode="wait">
						{selectedEmail ? (
							<Motion.div
								key={selectedEmail._id}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								className="bg-white dark:bg-[#0a0f1c] rounded-[3rem] border border-gray-100 dark:border-gray-800/50 h-full flex flex-col shadow-sm"
							>
								{/* Detail Header */}
								<div className="p-10 border-b border-gray-50 dark:border-gray-800/50 flex flex-col md:flex-row md:items-center justify-between gap-8">
									<div className="flex items-center gap-6">
										<div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 dark:bg-[#030712] text-gray-400 dark:text-gray-800 flex items-center justify-center shadow-inner border border-gray-100 dark:border-gray-800/50">
											<HiOutlineUser className="text-3xl" />
										</div>
										<div className="space-y-1">
											<div className="flex items-center gap-3">
												<h2 className="font-black text-2xl text-gray-900 dark:text-white uppercase tracking-tight">{selectedEmail.userName || selectedEmail.name}</h2>
												<span className="px-3 py-1 bg-orange/10 text-orange text-[9px] font-black uppercase tracking-widest rounded-full">New</span>
											</div>
											<div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-medium">
												<p className="text-orange">{selectedEmail.userEmail || selectedEmail.email}</p>
												{selectedEmail.phoneNumber && (
													<p className="text-gray-400">{selectedEmail.phoneNumber}</p>
												)}
											</div>
										</div>
									</div>
									<div className="flex flex-col items-end gap-3">
										<div className="bg-gray-50 dark:bg-[#030712] px-6 py-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-800/50 text-right shadow-inner">
											<p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Received On</p>
											<p className="text-xs font-bold text-gray-900 dark:text-white">
												{new Date(selectedEmail.createdAt).toLocaleString(undefined, { 
													dateStyle: 'medium', 
													timeStyle: 'short' 
												})}
											</p>
										</div>
										<button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-orange transition-colors px-2">
											<div className="w-1.5 h-1.5 rounded-full border-2 border-gray-400" />
											MARK AS READ
										</button>
									</div>
								</div>

								{/* Detail Body */}
								<div className="p-10 flex-grow overflow-y-auto custom-scrollbar space-y-10">
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-1 h-4 bg-orange rounded-full" />
											<h4 className="font-black uppercase tracking-widest text-[10px] text-gray-400">Subject</h4>
										</div>
										<p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
											{selectedEmail.subject || "No Subject Provided"}
										</p>
									</div>

									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-1 h-4 bg-orange rounded-full" />
											<h4 className="font-black uppercase tracking-widest text-[10px] text-gray-400">MESSAGE</h4>
										</div>
										<div className="bg-gray-50 dark:bg-[#030712] p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50 relative overflow-hidden shadow-inner group">
											<HiOutlineEnvelope className="absolute -right-4 -bottom-4 text-9xl text-gray-100 dark:text-gray-900/20 -rotate-12 transition-transform group-hover:scale-110" />
											<p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap relative z-10 font-medium italic">
												"{selectedEmail.emailBody || selectedEmail.message}"
											</p>
										</div>
									</div>
								</div>

								{/* Detail Footer */}
								<div className="p-10 border-t border-gray-50 dark:border-gray-800/50 flex justify-end gap-6">
									<button className="px-8 py-4 font-black uppercase tracking-widest text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
										ARCHIVE
									</button>
									<a
										href={`mailto:${selectedEmail.userEmail || selectedEmail.email}`}
										className="inline-flex items-center gap-3 bg-orange text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-orange/30 hover:scale-105 transition-all active:scale-95"
									>
										<HiOutlineEnvelope className="text-lg" />
										REPLY TO CLIENT
									</a>
								</div>
							</Motion.div>
						) : (
							<div className="bg-white dark:bg-[#0a0f1c] rounded-[3rem] border border-gray-100 dark:border-gray-800/50 h-full flex flex-col items-center justify-center p-20 text-center space-y-8 shadow-sm">
								<div className="w-24 h-24 rounded-[2rem] bg-gray-50 dark:bg-[#030712] flex items-center justify-center text-gray-200 dark:text-gray-800 shadow-inner">
									<HiOutlineEnvelope className="text-5xl" />
								</div>
								<div className="space-y-3">
									<h3 className="font-black text-2xl text-gray-900 dark:text-white uppercase tracking-tighter">SELECT AN EMAIL</h3>
									<p className="text-gray-500 dark:text-gray-500 font-medium max-w-xs mx-auto leading-relaxed">
										Choose an inquiry from the list to view its full details and respond to your potential clients.
									</p>
								</div>
							</div>
						)}
					</AnimatePresence>
				</div>
			</div>
=======
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Email Message"
				maxWidth="max-w-3xl"
			>
				<EmailDetails email={selectedEmail} />
			</Modal>
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
		</div>
	);
};

export default Emails;
