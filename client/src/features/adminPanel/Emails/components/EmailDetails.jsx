import { format } from "date-fns";
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineCalendar, HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

const EmailDetails = ({ email }) => {
	if (!email) return null;

	const details = [
		{ label: "From", value: email.userName, icon: <HiOutlineUser /> },
		{ label: "Email", value: email.userEmail, icon: <HiOutlineEnvelope /> },
		{
			label: "Date",
			value: format(new Date(email.createdAt), "PPP p"),
			icon: <HiOutlineCalendar />,
		},
		{ label: "Subject", value: email.subject, icon: <HiOutlineChatBubbleBottomCenterText /> },
	];

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{details.map((item) => (
					<div key={item.label} className="space-y-2">
						<span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-1">
							<span className="text-orange">{item.icon}</span>
							{item.label}
						</span>
						<div className="px-4 py-3 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-transparent font-bold text-gray-900 dark:text-white">
							{item.value}
						</div>
					</div>
				))}
			</div>

			<div className="space-y-2">
				<span className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
					Message
				</span>
				<div className="p-6 bg-gray-50 dark:bg-gray-950 rounded-[2rem] border border-transparent text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
					{email.emailBody}
				</div>
			</div>

			<div className="pt-4 flex justify-end">
				<a
					href={`mailto:${email.userEmail}?subject=Re: ${email.subject}`}
					className="px-8 py-4 bg-orange text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange/90 transition-all shadow-xl shadow-orange/20"
				>
					Reply via Email
				</a>
			</div>
		</div>
	);
};

export default EmailDetails;
