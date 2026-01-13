import { useState } from "react";
import { HiOutlineTrash, HiOutlineEnvelope, HiOutlineUser, HiOutlineClock } from "react-icons/hi2";
import useEmails from "../../../hooks/useEmails";
import useDeleteEmail from "./hooks/useDeleteEmail";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Emails = () => {
	const { emails, isLoading } = useEmails();
	const { deleteEmail, isLoading: isDeleting } = useDeleteEmail();
	const [selectedEmail, setSelectedEmail] = useState(null);

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this message?")) {
			deleteEmail(id);
			if (selectedEmail?._id === id) setSelectedEmail(null);
		}
	};

	if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin"></div></div>;

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">Messages</h1>
				<p className="text-gray-500 dark:text-gray-400 mt-2">Manage inquiries received through the contact form.</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Email List */}
				<div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
					{emails?.length === 0 ? (
						<div className="text-center py-12 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
							<HiOutlineEnvelope className="text-4xl text-gray-200 mx-auto mb-4" />
							<p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No messages yet</p>
						</div>
					) : (
						emails?.map((email) => (
							<Motion.div
								key={email._id}
								layout
								onClick={() => setSelectedEmail(email)}
								className={`p-6 rounded-3xl border cursor-pointer transition-all ${
									selectedEmail?._id === email._id
										? "bg-orange border-orange shadow-lg shadow-orange/20 text-white"
										: "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white hover:border-orange/50"
								}`}
							>
								<div className="flex justify-between items-start mb-2">
									<h3 className="font-black uppercase tracking-tight truncate pr-4">{email.name}</h3>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDelete(email._id);
										}}
										className={`p-2 rounded-xl transition-colors ${
											selectedEmail?._id === email._id
												? "hover:bg-white/20 text-white"
												: "hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500"
										}`}
									>
										<HiOutlineTrash />
									</button>
								</div>
								<p className={`text-xs truncate ${selectedEmail?._id === email._id ? "text-white/80" : "text-gray-500"}`}>
									{email.email}
								</p>
								<div className={`flex items-center gap-1 mt-4 text-[10px] font-black uppercase tracking-widest ${
									selectedEmail?._id === email._id ? "text-white/60" : "text-gray-400"
								}`}>
									<HiOutlineClock />
									{new Date(email.createdAt).toLocaleDateString()}
								</div>
							</Motion.div>
						))
					)}
				</div>

				{/* Email Content */}
				<div className="lg:col-span-2">
					<AnimatePresence mode="wait">
						{selectedEmail ? (
							<Motion.div
								key={selectedEmail._id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 h-full"
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-50 dark:border-gray-800">
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-12 h-12 rounded-2xl bg-orange/10 text-orange flex items-center justify-center">
												<HiOutlineUser className="text-2xl" />
											</div>
											<div>
												<h2 className="font-black text-xl text-gray-900 dark:text-white uppercase">{selectedEmail.name}</h2>
												<p className="text-orange text-sm font-bold">{selectedEmail.email}</p>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 dark:bg-gray-950 px-4 py-2 rounded-xl h-fit">
										<HiOutlineClock className="text-sm" />
										{new Date(selectedEmail.createdAt).toLocaleString()}
									</div>
								</div>

								<div className="mt-8">
									<h4 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-4">Message</h4>
									<div className="prose dark:prose-invert max-w-none">
										<p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
											{selectedEmail.message}
										</p>
									</div>
								</div>

								<div className="mt-12">
									<a
										href={`mailto:${selectedEmail.email}`}
										className="inline-flex items-center gap-2 bg-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange/20 hover:scale-105 transition-all"
									>
										<HiOutlineEnvelope className="text-lg" />
										Reply via Email
									</a>
								</div>
							</Motion.div>
						) : (
							<div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 h-full flex flex-col items-center justify-center p-12 text-center">
								<div className="w-20 h-20 rounded-4xl bg-gray-50 dark:bg-gray-950 flex items-center justify-center mb-6">
									<HiOutlineEnvelope className="text-4xl text-gray-200" />
								</div>
								<h3 className="font-black text-xl text-gray-900 dark:text-white uppercase">Select a message</h3>
								<p className="text-gray-500 mt-2 max-w-xs">Choose a conversation from the list to view its full details and respond.</p>
							</div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default Emails;
