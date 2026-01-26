import React from 'react';

const Input = React.forwardRef(({ label, error, icon: Icon, className = "", ...props }, ref) => {
	return (
		<div className="space-y-1.5">
			{label && (
				<label className="font-black uppercase tracking-widest text-[9px] text-gray-400 ml-3">
					{label}
				</label>
			)}
			<div className="relative">
				{Icon && (
					<Icon className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`} />
				)}
				<input
					ref={ref}
					className={`w-full ${Icon ? 'pl-11' : 'px-4'} pr-4 py-3 bg-gray-50 dark:bg-gray-950 border rounded-2xl transition-all text-sm text-gray-900 dark:text-white outline-none ${
						error 
							? 'border-red-500/50 focus:border-red-500 ring-4 ring-red-500/5' 
							: 'border-gray-100 dark:border-transparent focus:border-orange/20 focus:ring-4 focus:ring-orange/5'
					} ${className}`}
					{...props}
				/>
			</div>
			{error && (
				<p className="text-[8px] text-red-500 font-bold uppercase tracking-widest ml-4">
					{error}
				</p>
			)}
		</div>
	);
});

Input.displayName = 'Input';

export default Input;
