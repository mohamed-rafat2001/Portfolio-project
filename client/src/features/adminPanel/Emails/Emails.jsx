import { useState, useEffect } from "react";
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
import Pagination from "../../../shared/components/ui/Pagination";

const Emails = () => {
	const [page, setPage] = useState(1);
	const limit = 8;
	const { emails, isLoading, totalResults } = useEmails({ page, limit });
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

			<Pagination 
				page={page} 
				totalResults={totalResults} 
				limit={limit} 
				setPage={setPage} 
			/>

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
				</div>
			)}

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Email Message"
				maxWidth="max-w-3xl"
			>
				<EmailDetails email={selectedEmail} />
			</Modal>
		</div>
	);
};

export default Emails;
