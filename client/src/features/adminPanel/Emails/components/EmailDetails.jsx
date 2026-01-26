import { format } from "date-fns";
import { HiOutlineUser, HiOutlineEye, HiOutlinePhone, HiOutlineEnvelope, HiOutlineClock } from "react-icons/hi2";

const EmailDetails = ({ email, onMarkAsRead }) => {
	if (!email) return null;

	return (
		<div className="space-y-6 pb-4 overflow-x-hidden">
			{/* Sender Identity & Metadata Header */}
			<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-white/5 relative">
				<div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-[#030712] border border-gray-100 dark:border-white/10 flex items-center justify-center text-orange text-xl shrink-0 shadow-2xl">
                        <HiOutlineUser />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white truncate">
                                {email.userName}
                            </h2>
                            {!email.read && (
                                <span className="px-2 py-0.5 bg-orange/10 text-orange text-[7px] font-black uppercase tracking-widest rounded-full border border-orange/20 animate-pulse">New</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-orange group">
                                <HiOutlineEnvelope className="text-xs opacity-50" />
                                <span className="truncate max-w-[150px] md:max-w-none">{email.userEmail}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                <HiOutlinePhone className="text-xs opacity-50" />
                                <span className="truncate">{email.phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#030712]/40 p-4 rounded-2xl border border-gray-100 dark:border-white/5 min-w-[160px] lg:min-w-[180px] shadow-inner relative group overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 mb-2">
                            <HiOutlineClock className="text-orange text-xs" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Received at</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-900 dark:text-gray-300 uppercase tracking-widest leading-tight">
                            {format(new Date(email.createdAt), "MM/dd/yyyy,")}
                            <br />
                            <span className="text-orange/80 mt-1 block">{format(new Date(email.createdAt), "hh:mm:ss a")}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-3 h-8">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-100 dark:via-white/5 to-transparent"></div>
                {!email.read && (
                    <button 
                        onClick={onMarkAsRead}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 hover:text-orange transition-all cursor-pointer group whitespace-nowrap"
                    >
                        <HiOutlineEye className="text-sm group-hover:scale-110 transition-transform" />
                        Mark as Read
                    </button>
                )}
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-100 dark:via-white/5 to-transparent"></div>
            </div>

			{/* Communication Content Area */}
			<div className="space-y-8">
                {/* Subject Line */}
				<div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-5 bg-orange rounded-full shadow-[0_0_10px_rgba(255,165,0,0.5)]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Subject Inquiry</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter pl-4 break-words leading-tight">
                        {email.subject}
                    </h3>
                </div>

                {/* Message Body */}
				<div className="space-y-4">
					<div className="flex items-center gap-3">
                        <div className="w-1 h-5 bg-orange rounded-full shadow-[0_0_10px_rgba(255,165,0,0.5)]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Transmission Content</span>
                    </div>
					<div className="relative pl-4">
                        <div className="p-6 md:p-8 bg-gray-50 dark:bg-[#030712]/50 rounded-[2rem] border border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-300 leading-relaxed italic relative overflow-hidden group shadow-xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-orange/2 rounded-full blur-[60px] -mr-24 -mt-24"></div>
                            <span className="text-4xl absolute top-4 left-6 opacity-[0.03] font-serif text-gray-900 dark:text-white group-hover:opacity-[0.07] transition-opacity">"</span>
                            <p className="relative z-10 text-base md:text-lg font-bold tracking-tight px-1 md:px-4 line-height-relaxed opacity-80 break-words whitespace-pre-wrap">
                                {email.emailBody}
                            </p>
                            <span className="text-4xl absolute bottom-4 right-6 opacity-[0.03] font-serif text-gray-900 dark:text-white group-hover:opacity-[0.07] transition-opacity">"</span>
                        </div>
                    </div>
				</div>
			</div>

            {/* Strategic Response Footer */}
			<div className="pt-12 flex justify-end">
				<a
					href={`mailto:${email.userEmail}?subject=Re: ${email.subject}`}
					className="px-12 py-6 bg-orange text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-orange/90 transition-all shadow-2xl shadow-orange/20 hover:shadow-orange/40 hover:-translate-y-1 active:translate-y-0"
				>
					Reply
				</a>
			</div>
		</div>
	);
};

export default EmailDetails;
