import { format } from "date-fns";
import { HiOutlineUser, HiOutlineEye, HiOutlinePhone, HiOutlineEnvelope, HiOutlineClock } from "react-icons/hi2";

const EmailDetails = ({ email, onMarkAsRead }) => {
	if (!email) return null;

	return (
		<div className="space-y-10 pb-6">
			{/* Sender Identity & Metadata Header */}
			<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-white/5 relative">
				<div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[#030712] border border-white/10 flex items-center justify-center text-orange text-2xl shrink-0 shadow-2xl">
                        <HiOutlineUser />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white truncate">
                                {email.userName}
                            </h2>
                            {!email.read && (
                                <span className="px-3 py-1 bg-orange/10 text-orange text-[8px] font-black uppercase tracking-widest rounded-full border border-orange/20 animate-pulse">New</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange group">
                                <HiOutlineEnvelope className="text-sm opacity-50" />
                                <span className="truncate">{email.userEmail}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                <HiOutlinePhone className="text-sm opacity-50" />
                                <span>{email.phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#030712]/40 p-6 rounded-[2rem] border border-white/5 min-w-[220px] shadow-inner relative group overflow-hidden">
                    <div className="absolute inset-0 bg-orange/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 text-gray-500 mb-3">
                            <HiOutlineClock className="text-orange" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Received at</span>
                        </div>
                        <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest leading-relaxed">
                            {format(new Date(email.createdAt), "MM/dd/yyyy,")}
                            <br />
                            <span className="text-orange/80">{format(new Date(email.createdAt), "hh:mm:ss a")}</span>
                        </p>
                    </div>
                </div>
			</div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-4 h-10">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                {!email.read && (
                    <button 
                        onClick={onMarkAsRead}
                        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-orange transition-all cursor-pointer group"
                    >
                        <HiOutlineEye className="text-base group-hover:scale-110 transition-transform" />
                        Mark as Read
                    </button>
                )}
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>

			{/* Communication Content Area */}
			<div className="space-y-12">
                {/* Subject Line */}
				<div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-orange rounded-full shadow-[0_0_15px_rgba(255,165,0,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Subject Inquiry</span>
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter pl-6">
                        {email.subject}
                    </h3>
                </div>

                {/* Message Body */}
				<div className="space-y-6">
					<div className="flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-orange rounded-full shadow-[0_0_15px_rgba(255,165,0,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Transmission Content</span>
                    </div>
					<div className="relative pl-6">
                        <div className="p-12 bg-[#030712]/50 rounded-[3rem] border border-white/5 text-gray-300 leading-relaxed italic relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange/2 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                            <span className="text-6xl absolute top-8 left-10 opacity-[0.03] font-serif text-white group-hover:opacity-[0.07] transition-opacity">"</span>
                            <p className="relative z-10 text-xl font-bold tracking-tight px-6 line-height-relaxed opacity-80 decoration-orange/20">
                                {email.emailBody}
                            </p>
                            <span className="text-6xl absolute bottom-8 right-10 opacity-[0.03] font-serif text-white group-hover:opacity-[0.07] transition-opacity">"</span>
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
					Send Direct Hub Response
				</a>
			</div>
		</div>
	);
};

export default EmailDetails;
