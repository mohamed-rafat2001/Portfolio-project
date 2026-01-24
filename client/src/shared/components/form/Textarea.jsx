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
<<<<<<< HEAD
				className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border rounded-2xl focus:ring-4 transition-all text-sm resize-none outline-none ${
=======
				className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border rounded-xl focus:ring-4 transition-all text-sm resize-none outline-none ${
>>>>>>> 3b627a6825f4c024e8c6cfc521c4d2364ecc4f41
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
