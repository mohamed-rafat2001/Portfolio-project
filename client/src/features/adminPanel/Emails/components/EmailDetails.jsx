import { format } from "date-fns";
import { HiOutlineUser, HiOutlineEye, HiOutlinePhone, HiOutlineEnvelope, HiOutlineClock } from "react-icons/hi2";

const EmailDetails = ({ email, onMarkAsRead }) => {
	if (!email) return null;

	return (
		<div className="space-y-12 pb-10">
			{/* Top Header Section */}
			<div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-100 dark:border-white/5 pb-10">
				<div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-orange/5 border border-orange/10 flex items-center justify-center text-orange text-2xl">
                        <HiOutlineUser />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
                                {email.userName}
                            </h2>
                            {!email.read && (
                                <span className="px-3 py-1 bg-orange/10 text-orange text-[8px] font-black uppercase tracking-widest rounded-full">New</span>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-5">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange">
                                <HiOutlineEnvelope className="text-sm" />
                                {email.userEmail}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <HiOutlinePhone className="text-sm" />
                                {email.phoneNumber}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50/50 dark:bg-white/[0.02] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 min-w-[200px]">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <HiOutlineClock className="text-sm" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Received at</span>
                    </div>
                    <p className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">
                        {format(new Date(email.createdAt), "MM/dd/yyyy,")}
                        <br />
                        {format(new Date(email.createdAt), "hh:mm:ss a")}
                    </p>
                </div>
			</div>

            {/* Actions Area */}
            <div className="flex justify-end h-8">
                {!email.read && (
                    <button 
                        onClick={onMarkAsRead}
                        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange transition-colors cursor-pointer"
                    >
                        <HiOutlineEye className="text-sm" />
                        Mark as Read
                    </button>
                )}
            </div>

			{/* Subject Section */}
			<div className="space-y-6">
				<div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-orange rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Subject</span>
                </div>
				<h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter pl-5">
				    {email.subject}
				</h3>
			</div>

            {/* Message Section */}
			<div className="space-y-6">
				<div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-orange rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Message Message</span>
                </div>
				<div className="relative pl-5">
                    <div className="p-10 bg-gray-50/30 dark:bg-white/[0.02] rounded-[3rem] border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-300 leading-relaxed italic relative overflow-hidden">
                        <span className="text-4xl absolute top-8 left-8 opacity-10 font-serif">"</span>
                        <p className="relative z-10 text-lg font-bold line-height-relaxed px-4">
                            {email.emailBody}
                        </p>
                        <span className="text-4xl absolute bottom-8 right-8 opacity-10 font-serif">"</span>
                    </div>
                </div>
			</div>

			<div className="pt-10 flex justify-end">
				<a
					href={`mailto:${email.userEmail}?subject=Re: ${email.subject}`}
					className="px-10 py-5 bg-orange text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange/90 transition-all shadow-2xl shadow-orange/20"
				>
					Send Direct Response
				</a>
			</div>
		</div>
	);
};

export default EmailDetails;
