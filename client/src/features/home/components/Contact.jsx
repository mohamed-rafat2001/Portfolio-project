import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import useCreateEmail from "../../adminPanel/Emails/hooks/useCreateEmail";
import { motion as Motion } from "framer-motion";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
};

const contactSchema = z.object({
	userName: z.string().min(3, "Name must be at least 3 characters"),
	userEmail: z.string().email("Please enter a valid email"),
	phoneNumber: z.string().optional(),
	subject: z.string().optional(),
	emailBody: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
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
		<Motion.section
			id="contact"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="py-24 md:py-32 bg-[#030712] text-white"
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center gap-8 mb-24">
					<span className="text-orange font-black text-sm uppercase tracking-[0.4em]">
						05
					</span>
					<div className="h-px grow bg-gray-800/50"></div>
					<h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
						Get In <span className="text-orange">Touch</span>
					</h2>
				</div>

				<div className="max-w-6xl mx-auto">
					<div className="text-center space-y-6 mb-24">
						<h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
							Let's Work Together
						</h3>
						<p className="text-gray-400 max-w-xl mx-auto text-base font-medium leading-relaxed">
							Have a project in mind or just want to say hi? Feel free to reach
							out and let's build something amazing together.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
						<ContactInfo />
						<ContactForm />
					</div>
				</div>
			</div>
		</Motion.section>
	);
};

export default Contact;
