import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { HiOutlineEnvelope } from "react-icons/hi2";
import useEmails from "./hooks/useEmails";
import useUpdateEmailStatus from "./hooks/useUpdateEmailStatus";
import useDeleteEmail from "./hooks/useDeleteEmail";
import EmailCard from "./components/EmailCard";
import EmailDetails from "./components/EmailDetails";
import Modal from "../../../shared/components/ui/Modal";
import AdminHeader from "../../../shared/components/ui/AdminHeader";
import LoadingState from "../../../shared/components/ui/LoadingState";
import Pagination from "../../../shared/components/ui/Pagination";

const Emails = () => {
	const [page, setPage] = useState(1);
	const limit = 10;
	const { emails, isLoading, totalResults } = useEmails({ page, limit });
	const { mutate: updateStatus } = useUpdateEmailStatus();
	const { mutate: deleteEmail } = useDeleteEmail();

	const [selectedEmail, setSelectedEmail] = useState(null);

	// Set first email as selected by default when emails load
	useEffect(() => {
		if (emails?.length > 0 && !selectedEmail) {
			setSelectedEmail(emails[0]);
		}
	}, [emails, selectedEmail]);

	const handleEmailClick = (email) => {
		setSelectedEmail(email);
		if (!email.read) {
			updateStatus({ id: email._id, data: { read: true } });
		}
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this email?")) {
			deleteEmail(id, {
                onSuccess: () => {
                    if (selectedEmail?._id === id) {
                        setSelectedEmail(emails?.find(e => e._id !== id) || null);
                    }
                }
            });
		}
	};

	if (isLoading) return <LoadingState message="Loading your workspace..." />;

	const unreadCount = emails?.filter((e) => !e.read).length || 0;

	return (
		<div className="flex flex-col h-[calc(100vh-140px)] gap-8">
			<AdminHeader
				title="Messages Hub"
				description={
					unreadCount > 0
						? `Strategic Alert: ${unreadCount} new opportunities await your review`
						: "Performance Peak: All communications are synchronized"
				}
				icon={<HiOutlineEnvelope />}
			/>

			<div className="flex-1 flex gap-8 min-h-0 overflow-hidden">
				{/* Left Sidebar: Email List */}
				<div className="w-[380px] flex flex-col gap-6 h-full">
                    <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
                        <AnimatePresence mode="popLayout">
                            {emails?.map((email) => (
                                <EmailCard
                                    key={email._id}
                                    email={email}
                                    isSelected={selectedEmail?._id === email._id}
                                    onClick={handleEmailClick}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </AnimatePresence>

                        {emails?.length === 0 && (
                            <div className="text-center py-10 opacity-40">
                                <HiOutlineEnvelope className="text-4xl mx-auto mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Inbox is empty</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="pt-2">
                        <Pagination 
                            page={page} 
                            totalResults={totalResults} 
                            limit={limit} 
                            setPage={setPage} 
                            size="small"
                        />
                    </div>
				</div>

				{/* Right main: Email content details */}
				<div className="flex-1 h-full bg-white dark:bg-[#0b1120] rounded-[3rem] border border-gray-100 dark:border-white/5 overflow-y-auto custom-scrollbar shadow-2xl p-12">
					<AnimatePresence mode="wait">
						{selectedEmail ? (
							<Motion.div
								key={selectedEmail._id}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								<EmailDetails 
                                    email={selectedEmail} 
                                    onMarkAsRead={() => updateStatus({ id: selectedEmail._id, data: { read: true } })}
                                />
							</Motion.div>
						) : (
							<div className="h-full flex flex-col items-center justify-center text-center opacity-20">
								<HiOutlineEnvelope className="text-8xl mb-6 text-gray-400" />
								<h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">
									Select a message to view details
								</h3>
							</div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default Emails;
