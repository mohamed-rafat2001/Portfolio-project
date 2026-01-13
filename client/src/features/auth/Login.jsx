import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { HiEnvelope, HiLockClosed, HiArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useLogin from "./hooks/useLogin";
import Logo from "../../ui/Logo";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { loginFunc, isLoading } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) return;
		loginFunc({ email, password });
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
						Welcome Back
					</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
						Please enter your details to sign in.
					</p>
				</div>

				<div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/[0.03] border border-gray-100 dark:border-gray-800">
					<form onSubmit={handleSubmit} className="space-y-6">
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

						<button
							type="submit"
							disabled={isLoading}
							className="w-full py-4 bg-orange text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
						>
							{isLoading ? "Signing in..." : "Sign In"}
							{!isLoading && <HiArrowRight className="text-lg" />}
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-sm text-gray-500 font-medium">
							Don't have an account?{" "}
							<Link
								to="/signup"
								className="text-orange font-black uppercase tracking-widest text-[10px] hover:underline"
							>
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</Motion.div>
		</div>
	);
};

export default Login;
