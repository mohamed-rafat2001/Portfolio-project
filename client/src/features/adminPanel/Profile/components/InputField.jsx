import React from 'react';

const InputField = React.forwardRef(({ label, error, icon: Icon, className = "", ...props }, ref) => {
	return (
		<div className="space-y-2.5 w-full group/input">
			{label && (
				<label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4 group-focus-within/input:text-orange transition-colors">
					{label}
				</label>
			)}
			<div className="relative">
				{Icon && (
					<Icon className={`absolute left-5 top-1/2 -translate-y-1/2 text-xl transition-colors ${error ? 'text-red-500' : 'text-gray-500 group-focus-within/input:text-orange'}`} />
				)}
				<input
					ref={ref}
					className={`w-full ${Icon ? 'pl-14' : 'px-6'} pr-6 py-4 bg-[#030712] border-2 rounded-[1.5rem] transition-all text-sm font-bold text-white outline-none ${
						error 
							? 'border-red-500/50 focus:border-red-500' 
							: 'border-white/5 focus:border-orange/40'
					} ${className}`}
					{...props}
				/>
			</div>
			{error && (
				<p className="text-[9px] text-red-500 font-black uppercase tracking-widest ml-5 mt-1">
					{error}
				</p>
			)}
		</div>
	);
});

InputField.displayName = 'InputField';

export default InputField;
