import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { HiPaperAirplane } from "react-icons/hi2";
import useCreateEmail from "../../adminPanel/Emails/hooks/useCreateEmail";
import Input from "../../../shared/components/form/Input";
import Textarea from "../../../shared/components/form/Textarea";
import ButtonLoader from "../../../shared/components/ui/ButtonLoader";

const contactSchema = z.object({
	userName: z.string().min(3, "Name must be at least 3 characters"),
	userEmail: z.string().email("Please enter a valid email"),
	phoneNumber: z.string().min(1, "Phone number is required"),
	subject: z.string().min(3, "Subject must be at least 3 characters"),
	emailBody: z.string().min(20, "Message must be at least 20 characters"),
});

const ContactForm = () => {
	const { createEmail, isLoading } = useCreateEmail();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(contactSchema),
		mode: "onChange",
	});

	const onSubmit = (data) => {
		createEmail(data, {
			onSuccess: () => {
				toast.success("Message sent successfully!");
				reset();
			},
			onError: () => {
				toast.error("Failed to send message. Please try again.");
			},
		});
	};

	return (
		<div className="lg:col-span-7">
			<div className="bg-gray-50 dark:bg-[#0a0f1c] rounded-[3rem] p-6 md:p-10 lg:p-14 border border-gray-100 dark:border-gray-800/50 relative overflow-hidden shadow-xl transition-colors duration-500">
				<div className="absolute top-0 right-0 w-80 h-80 bg-orange/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
				
				<form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Input
							label="Your Name"
							placeholder="John Doe"
							className="!bg-white dark:!bg-[#030712] !border-gray-100 dark:!border-gray-800/50 focus:!border-orange/30 !py-4 !px-6 !rounded-2xl"
							error={errors.userName?.message}
							{...register("userName")}
						/>
						<Input
							label="Your Email"
							type="email"
							placeholder="john@example.com"
							className="!bg-white dark:!bg-[#030712] !border-gray-100 dark:!border-gray-800/50 focus:!border-orange/30 !py-4 !px-6 !rounded-2xl"
							error={errors.userEmail?.message}
							{...register("userEmail")}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Input
							label="Phone Number"
							placeholder="+20 10..."
							className="!bg-white dark:!bg-[#030712] !border-gray-100 dark:!border-gray-800/50 focus:!border-orange/30 !py-4 !px-6 !rounded-2xl"
							error={errors.phoneNumber?.message}
							{...register("phoneNumber")}
						/>
						<Input
							label="Subject"
							placeholder="Project Inquiry"
							className="!bg-white dark:!bg-[#030712] !border-gray-100 dark:!border-gray-800/50 focus:!border-orange/30 !py-4 !px-6 !rounded-2xl"
							error={errors.subject?.message}
							{...register("subject")}
						/>
					</div>

					<Textarea
						label="Message"
						rows="5"
						placeholder="Tell me about your project..."
						className="!bg-white dark:!bg-[#030712] !border-gray-100 dark:!border-gray-800/50 focus:!border-orange/30 !py-4 !px-6 !rounded-2xl"
						error={errors.emailBody?.message}
						{...register("emailBody")}
					/>

					<button 
						disabled={isLoading}
						className="w-full py-5 bg-orange text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-orange-600 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(255,165,0,0.5)] active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed min-h-[60px]"
					>
						{isLoading ? <ButtonLoader /> : (
							<>
								Send Message
								<HiPaperAirplane className="text-lg rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
							</>
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ContactForm;
