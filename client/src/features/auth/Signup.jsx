import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { HiEnvelope, HiLockClosed, HiUser, HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useSignup from "./hooks/useSignup";
import Logo from "../../ui/Logo";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { signupFunc, isLoading } = useSignup();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !email || !password || !confirmPassword) return;
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		signupFunc({ name, email, password, confirmPassword });
	};

	return (
		<div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 flex items-center justify-center p-4">
			<Motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md"
			>
				<div className="text-center mb-10">
					<div className="inline-block mb-6">
						<Logo textSize="text-2xl" iconSize="text-3xl" />
					</div>
					<h1 className="text-3xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
						Create Account
					</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
						Join us and manage your portfolio today.
					</p>
				</div>

				<div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/[0.03] border border-gray-100 dark:border-gray-800">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
								Full Name
							</label>
							<div className="relative">
								<HiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="John Doe"
									className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:border-orange/30 focus:outline-none transition-all text-sm font-medium dark:text-white"
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
								Email Address
							</label>
							<div className="relative">
								<HiEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="admin@example.com"
									className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:border-orange/30 focus:outline-none transition-all text-sm font-medium dark:text-white"
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
								Password
							</label>
							<div className="relative">
								<HiLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:border-orange/30 focus:outline-none transition-all text-sm font-medium dark:text-white"
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
								Confirm Password
							</label>
							<div className="relative">
								<HiLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
								<input
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="••••••••"
									className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 focus:border-orange/30 focus:outline-none transition-all text-sm font-medium dark:text-white"
									disabled={isLoading}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full py-4 bg-orange text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
						>
							{isLoading ? "Creating account..." : "Sign Up"}
							{!isLoading && <HiArrowRight className="text-lg" />}
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-sm text-gray-500 font-medium">
							Already have an account?{" "}
							<Link to="/login" className="text-orange font-black uppercase tracking-widest text-[10px] hover:underline">
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</Motion.div>
		</div>
	);
};

export default Signup;
