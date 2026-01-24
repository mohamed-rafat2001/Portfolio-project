import React from 'react';

const Textarea = React.forwardRef(({ label, error, className = "", ...props }, ref) => {
	return (
		<div className="space-y-2.5 w-full group/input">
			{label && (
				<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4 group-focus-within/input:text-orange transition-colors">
					{label}
				</label>
			)}
			<textarea
				ref={ref}
				className={`w-full px-6 py-4 bg-[#030712] border-2 rounded-[1.5rem] transition-all text-sm font-bold text-white outline-none resize-none ${
					error 
						? 'border-red-500/50 focus:border-red-500' 
						: 'border-white/5 focus:border-orange/40'
				} ${className}`}
				{...props}
			/>
			{error && (
				<p className="text-[9px] text-red-500 font-black uppercase tracking-widest ml-5 mt-1">
					{error}
				</p>
			)}
		</div>
	);
});

Textarea.displayName = 'Textarea';

export default Textarea;
