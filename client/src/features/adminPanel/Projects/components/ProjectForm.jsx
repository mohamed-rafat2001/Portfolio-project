import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import { 
    HiOutlineCloudArrowUp, 
    HiOutlineXMark, 
    HiOutlineRocketLaunch,
    HiOutlineIdentification,
    HiOutlineLink,
    HiOutlineCodeBracket,
    HiOutlinePhoto,
    HiOutlinePlus
} from "react-icons/hi2";
import { motion as Motion, AnimatePresence } from "framer-motion";
import InputField from "../../Profile/components/InputField";
import Textarea from "../../../../shared/components/form/Textarea";

const projectSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().min(20, "Description must be at least 20 characters"),
	techs: z.string().transform((val) => val.split(",").map((t) => t.trim()).filter(Boolean)),
	liveLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
	githubLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
	isPreferred: z.boolean().default(false),
});

const ProjectForm = ({ project, onSubmit, isLoading, onCancel, progress }) => {
    const [step, setStep] = useState(1);
	const [mainImgPreview, setMainImgPreview] = useState(project?.mainImg?.secure_url || null);
	const [mainImgFile, setMainImgFile] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState(project?.images?.map(img => img.secure_url) || []);
    const [galleryFiles, setGalleryFiles] = useState([]);
    
    const galleryInputRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		resolver: zodResolver(projectSchema),
		defaultValues: project
			? {
					...project,
					techs: project.techStack?.[0]?.techs?.join(", ") || "",
                    liveLink: project.liveUrl,
                    githubLink: project.repoUrl
			  }
			: {
					title: "",
					description: "",
					techs: "",
					liveLink: "",
					githubLink: "",
					isPreferred: false,
			  },
	});

	const isPreferred = watch("isPreferred");

	const handleMainImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setMainImgFile(file);
			const reader = new FileReader();
			reader.onloadend = () => setMainImgPreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setGalleryFiles(prev => [...prev, ...files]);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setGalleryPreviews(prev => [...prev, reader.result]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeGalleryImage = (index) => {
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
        // Note: For existing images, we might need a way to track deletions. 
        // For simplicity here, we'll just handle new files.
        setGalleryFiles(prev => prev.filter((_, i) => i !== (index - (project?.images?.length || 0))));
    };

	const onFormSubmit = (data) => {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (key === "techs") {
				data[key].forEach((tech, index) => {
					formData.append(`techStack[0][techs][${index}]`, tech);
				});
                formData.append(`techStack[0][title]`, "Main Stack");
			} else if (key === "liveLink") {
                formData.append("liveUrl", data[key]);
            } else if (key === "githubLink") {
                formData.append("repoUrl", data[key]);
            } else if (data[key] !== undefined && data[key] !== null) {
				formData.append(key, data[key]);
			}
		});

        if (mainImgFile) {
            formData.append("mainImg", mainImgFile);
        }

        galleryFiles.forEach((file) => {
            formData.append("images", file);
        });

		onSubmit(formData);
	};

	return (
		<div className="space-y-8">
            {/* Modal Header Design (Image 0) */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#030712] border border-white/5 flex items-center justify-center text-orange text-2xl shadow-2xl">
                        <HiOutlineRocketLaunch />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">New Project</h2>
                        <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black text-orange uppercase tracking-widest">Step {step} of 2</span>
                             <span className="text-[10px] text-gray-600 font-bold">•</span>
                             <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{step === 1 ? 'Basic Info' : 'Media Assets'}</span>
                        </div>
                    </div>
                </div>
                <button 
                    type="button"
                    onClick={onCancel}
                    className="p-3 bg-[#030712] hover:bg-white/5 rounded-2xl text-gray-600 hover:text-white transition-colors cursor-pointer"
                >
                    <HiOutlineXMark className="text-2xl" />
                </button>
            </div>

            {/* Progress Segments */}
            <div className="flex gap-2">
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-orange' : 'bg-[#030712]'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-orange' : 'bg-[#030712]'}`} />
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <Motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <InputField 
                                label="Title"
                                placeholder="Project name"
                                icon={HiOutlineIdentification}
                                error={errors.title?.message}
                                {...register("title")}
                            />

                            <div className="space-y-2.5">
                                <label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-6 py-4 bg-[#030712] border-2 border-white/5 rounded-[1.5rem] transition-all text-sm font-bold text-white outline-none focus:border-orange/40 min-h-[120px]"
                                    placeholder="Briefly describe your project..."
                                    {...register("description")}
                                />
                                {errors.description && <p className="text-[9px] text-red-500 font-black uppercase tracking-widest ml-5 mt-1">{errors.description.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField 
                                    label="Github"
                                    placeholder="Repository link"
                                    icon={HiOutlineCodeBracket}
                                    error={errors.githubLink?.message}
                                    {...register("githubLink")}
                                />
                                <InputField 
                                    label="Live Demo"
                                    placeholder="Deployment link"
                                    icon={HiOutlineLink}
                                    error={errors.liveLink?.message}
                                    {...register("liveLink")}
                                />
                            </div>

                            <InputField 
                                label="Tech Stack (comma separated)"
                                placeholder="React, Tailwind, Node.js"
                                icon={HiOutlinePhoto}
                                error={errors.techs?.message}
                                {...register("techs")}
                            />

                            <div className="p-8 bg-[#030712] border-2 border-white/5 rounded-[2rem] flex items-center justify-between group cursor-pointer" onClick={() => setValue("isPreferred", !isPreferred)}>
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-6 rounded-full transition-all relative ${isPreferred ? 'bg-orange' : 'bg-white/10'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPreferred ? 'left-7' : 'left-1'}`} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">Featured Project</h4>
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Display this project at the top of your portfolio</p>
                                    </div>
                                </div>
                                <input type="checkbox" className="hidden" {...register("isPreferred")} />
                            </div>
                        </Motion.div>
                    )}

                    {step === 2 && (
                        <Motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            {/* Main Image Upload */}
                            <div className="space-y-4">
                                <label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">Main Cover Image</label>
                                <div 
                                    onClick={() => document.getElementById('main-img-input').click()}
                                    className="relative aspect-video rounded-[2.5rem] bg-[#030712] border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-orange/20 transition-all"
                                >
                                    <input type="file" id="main-img-input" className="hidden" accept="image/*" onChange={handleMainImgChange} />
                                    {mainImgPreview ? (
                                        <img src={mainImgPreview} alt="Main Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center">
                                            <HiOutlineCloudArrowUp className="text-5xl text-gray-700 mb-2 mx-auto" />
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Click to upload cover</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Gallery Upload */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-4">
                                    <label className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-400">Project Gallery</label>
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{galleryPreviews.length} Images</span>
                                </div>
                                
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    {galleryPreviews.map((preview, index) => (
                                        <div key={index} className="relative aspect-square rounded-2xl bg-[#030712] border border-white/5 overflow-hidden group">
                                            <img src={preview} alt="Gallery item" className="w-full h-full object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                            >
                                                <HiOutlineXMark className="text-xl" />
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        type="button"
                                        onClick={() => galleryInputRef.current.click()}
                                        className="aspect-square rounded-2xl bg-[#030712] border-2 border-dashed border-white/5 flex items-center justify-center text-gray-700 hover:border-orange/20 hover:text-orange transition-all"
                                    >
                                        <HiOutlinePlus className="text-2xl" />
                                    </button>
                                </div>
                                <input 
                                    type="file" 
                                    multiple 
                                    className="hidden" 
                                    ref={galleryInputRef} 
                                    onChange={handleGalleryChange}
                                    accept="image/*"
                                />
                            </div>

                            {/* Progress Bar */}
                            {isLoading && (
                                <div className="space-y-4 pt-10 border-t border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-orange uppercase tracking-widest">Uploading Project Assets...</span>
                                        <span className="text-[10px] font-black text-white">{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-[#030712] rounded-full overflow-hidden">
                                        <Motion.div 
                                            className="h-full bg-orange"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </Motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-6 pt-10 border-t border-white/5">
                    <button 
                        type="button"
                        onClick={step === 1 ? onCancel : () => setStep(1)}
                        className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.3em] transition-colors cursor-pointer"
                    >
                        {step === 1 ? 'Cancel' : 'Go Back'}
                    </button>
                    <button 
                        type={step === 2 ? "submit" : "button"}
                        onClick={step === 1 ? () => setStep(2) : undefined}
                        disabled={isLoading}
                        className="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-orange hover:text-white transition-all shadow-2xl disabled:opacity-50"
                    >
                        {step === 1 ? 'Next Step' : (project ? 'Update Project' : 'Launch Project')}
                    </button>
                </div>
            </form>
		</div>
	);
};

export default ProjectForm;
