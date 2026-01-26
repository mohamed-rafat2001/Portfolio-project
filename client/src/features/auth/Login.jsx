import { motion as Motion } from "framer-motion";
import { HiEnvelope, HiLockClosed, HiArrowRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import useLogin from "./hooks/useLogin";
import Logo from "../../shared/components/ui/Logo";
import ButtonLoader from "../../shared/components/ui/ButtonLoader";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email"),
	password: z.string().min(1, "Password is required"),
});

const Login = () => {
	const navigate = useNavigate();
	const { loginFunc, isLoading } = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const onSubmit = (data) => {
		loginFunc(data, {
			onSuccess: () => {
				toast.success("Welcome back!");
			},
			onError: (err) =>
				toast.error(err?.response?.data?.message || "Login failed"),
		});
	};

	return (
		<div className="min-h-screen bg-[#fafafa] dark:bg-[#030712] flex items-center justify-center p-4">
			<Motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md"
			>
				<div className="text-center mb-10">
					<div className="inline-block mb-6">
						<Link to="/">
							<Logo textSize="text-2xl" iconSize="text-3xl" />
						</Link>
					</div>
					<h1 className="text-3xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
						Welcome Back
					</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
						Please enter your details to sign in.
					</p>
				</div>

				<div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/[0.03] border border-gray-100 dark:border-gray-800">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-2">
							<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
								Email Address
							</label>
							<div className="relative">
								<HiEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
								<input
									{...register("email")}
									type="email"
									placeholder="admin@example.com"
									className={`w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border ${
										errors.email ? "border-red-500" : "border-gray-100 dark:border-gray-700"
									} focus:border-orange/30 focus:outline-none transition-all text-sm font-medium dark:text-white`}
									disabled={isLoading}
								/>
							</div>
							{errors.email && (
								<p className="text-[10px] text-red-500 ml-4 font-bold uppercase tracking-widest">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
								Password
							</label>
							<div className="relative">
								<HiLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
								<input
									{...register("password")}
									type="password"
									placeholder="••••••••"
									className={`w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border ${
										errors.password ? "border-red-500" : "border-gray-100 dark:border-gray-700"
									} focus:border-orange/30 focus:outline-none transition-all text-sm font-medium dark:text-white`}
									disabled={isLoading}
								/>
							</div>
							{errors.password && (
								<p className="text-[10px] text-red-500 ml-4 font-bold uppercase tracking-widest">
									{errors.password.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full py-4 bg-orange text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed min-h-[56px]"
						>
							{isLoading ? <ButtonLoader /> : (
								<>
									Sign In
									<HiArrowRight className="text-lg" />
								</>
							)}
						</button>
					</form>
				</div>
			</Motion.div>
		</div>
	);
};

export default Login;
