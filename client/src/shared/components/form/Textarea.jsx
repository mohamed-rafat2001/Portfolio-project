import React from 'react';

const Textarea = React.forwardRef(({ label, error, className = "", ...props }, ref) => {
	return (
		<div className="space-y-1.5">
			{label && (
				<label className="font-black uppercase tracking-widest text-[9px] text-gray-400 ml-3">
					{label}
				</label>
			)}
			<textarea
				ref={ref}
				className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border rounded-2xl focus:ring-4 transition-all text-sm resize-none outline-none ${
					error 
						? 'border-red-500/50 focus:ring-red-500/5 focus:border-red-500' 
						: 'border-transparent focus:border-orange/20 focus:ring-orange/5'
				} ${className}`}
				{...props}
			/>
			{error && (
				<p className="text-[8px] text-red-500 font-bold uppercase tracking-widest ml-4">
					{error}
				</p>
			)}
		</div>
	);
});

Textarea.displayName = 'Textarea';

export default Textarea;
