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
    HiOutlinePlus,
    HiOutlineChevronRight,
    HiOutlineChevronLeft,
    HiOutlineTrash,
    HiOutlineComputerDesktop,
    HiOutlineTag
} from "react-icons/hi2";
import { motion as Motion, AnimatePresence } from "framer-motion";
import InputField from "../../Profile/components/InputField";

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
		trigger,
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
        const isExisting = index < (project?.images?.length || 0);
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
        if (!isExisting) {
            setGalleryFiles(prev => prev.filter((_, i) => i !== (index - (project?.images?.length || 0))));
        }
    };

    const handleNext = async () => {
        const result = await trigger(["title", "description", "techs"]);
        if (result) setStep(2);
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
		<div className="space-y-10">
            {/* Custom Premium Header */}
            <div className="flex items-center justify-between pb-8 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-[#030712] border border-gray-100 dark:border-white/5 flex items-center justify-center text-orange text-3xl shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)]">
                        <HiOutlineRocketLaunch />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-1">
                            {project ? 'Edit Project' : 'New Project'}
                        </h2>
                        <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1.5 px-3 py-1 bg-orange/10 border border-orange/20 rounded-lg">
                                <span className="text-[10px] font-black text-orange uppercase tracking-widest">Step {step}/2</span>
                             </div>
                             <span className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                                {step === 1 ? 'Project Foundation' : 'Visual Assets & Gallery'}
                             </span>
                        </div>
                    </div>
                </div>
                <button 
                    type="button"
                    onClick={onCancel}
                    className="w-12 h-12 bg-gray-50 dark:bg-[#030712] hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer group"
                >
                    <HiOutlineXMark className="text-2xl group-hover:rotate-90 transition-transform" />
                </button>
            </div>

            {/* Stepper Logic */}
            <div className="flex gap-4 px-2">
                {[1, 2].map((i) => (
                    <div key={i} className="flex-1 h-2 bg-gray-100 dark:bg-[#030712] rounded-full overflow-hidden border border-gray-100 dark:border-white/5">
                        <Motion.div 
                            className="h-full bg-orange"
                            initial={{ width: 0 }}
                            animate={{ width: step >= i ? "100%" : "0%" }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                        />
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-10">
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <Motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            className="space-y-10"
                        >
                            <InputField 
                                label="Project Title"
                                placeholder="Enter a cinematic name..."
                                icon={HiOutlineIdentification}
                                error={errors.title?.message}
                                {...register("title")}
                            />

                            <div className="space-y-3 group/textarea">
                                <label className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4 group-focus-within/textarea:text-orange transition-colors">
                                    <HiOutlineComputerDesktop className="text-sm" />
                                    Project Description
                                </label>
                                <textarea
                                    className="w-full px-6 py-5 bg-gray-50 dark:bg-[#030712] border-2 border-gray-100 dark:border-white/5 rounded-[2rem] transition-all text-sm font-medium text-gray-900 dark:text-white/90 outline-none focus:border-orange/30 min-h-[160px] leading-relaxed placeholder:text-gray-500"
                                    placeholder="Tell the story of this innovation..."
                                    {...register("description")}
                                />
                                {errors.description && <p className="text-[9px] text-red-500 font-black uppercase tracking-widest ml-5">{errors.description.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField 
                                    label="Github Source"
                                    placeholder="Repository link"
                                    icon={HiOutlineCodeBracket}
                                    error={errors.githubLink?.message}
                                    {...register("githubLink")}
                                />
                                <InputField 
                                    label="Live Instance"
                                    placeholder="Deployment link"
                                    icon={HiOutlineLink}
                                    error={errors.liveLink?.message}
                                    {...register("liveLink")}
                                />
                            </div>

                            <InputField 
                                label="Technologies Used"
                                placeholder="React, Three.js, Node.js..."
                                icon={HiOutlineTag}
                                error={errors.techs?.message}
                                {...register("techs")}
                            />

                            {/* Premium Toggle Section */}
                            <div 
                                className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer group flex items-center justify-between ${
                                    isPreferred 
                                        ? 'bg-orange/5 border-orange/20 shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)]' 
                                        : 'bg-gray-50 dark:bg-[#030712] border-gray-100 dark:border-white/5 hover:border-orange/20'
                                }`}
                                onClick={() => setValue("isPreferred", !isPreferred)}
                            >
                                <div className="flex items-center gap-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 flex items-center justify-center text-2xl">
                                        <HiOutlineRocketLaunch className={isPreferred ? 'text-orange animate-pulse' : 'text-gray-400 dark:text-gray-700'} />
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-black uppercase tracking-widest mb-1 ${isPreferred ? 'text-orange dark:text-white' : 'text-gray-400'}`}>
                                            Featured Spotlight
                                        </h4>
                                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                            Priority placement at the top of your portfolio
                                        </p>
                                    </div>
                                </div>
                                <div className={`w-14 h-7 rounded-full transition-all relative p-1 ${isPreferred ? 'bg-orange' : 'bg-gray-200 dark:bg-white/10'}`}>
                                    <div className={`h-full aspect-square bg-white rounded-full transition-all shadow-xl ${isPreferred ? 'translate-x-[28px]' : 'translate-x-0'}`} />
                                </div>
                                <input type="checkbox" className="hidden" {...register("isPreferred")} />
                            </div>
                        </Motion.div>
                    ) : (
                        <Motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            className="space-y-12"
                        >
                            {/* Cinematic Cover Upload */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] text-gray-400 ml-4">
                                    <HiOutlinePhoto className="text-sm" />
                                    Primary Cinematic Cover
                                </label>
                                <div 
                                    onClick={() => document.getElementById('main-img-input').click()}
                                    className="relative aspect-video rounded-[2.5rem] bg-gray-50 dark:bg-[#030712] border-2 border-dashed border-gray-100 dark:border-white/10 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-orange/30 transition-all shadow-2xl"
                                >
                                    <input type="file" id="main-img-input" className="hidden" accept="image/*" onChange={handleMainImgChange} />
                                    {mainImgPreview ? (
                                        <>
                                            <img src={mainImgPreview} alt="Main Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">Change Cover</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center p-8">
                                            <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:text-orange transition-all">
                                                <HiOutlineCloudArrowUp className="text-3xl text-gray-400 dark:text-gray-700 group-hover:text-orange transition-colors" />
                                            </div>
                                            <p className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-1">Deploy Cover Asset</p>
                                            <p className="text-[8px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">16:9 ratio recommended</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dynamic Gallery System */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-6">
                                    <label className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] text-gray-400">
                                        <HiOutlinePhoto className="text-sm" />
                                        Interactive Gallery
                                    </label>
                                    <span className="px-3 py-1 bg-gray-50 dark:bg-[#030712] border border-gray-100 dark:border-white/5 rounded-full text-[8px] font-black text-gray-900 dark:text-white uppercase tracking-widest">
                                        {galleryPreviews.length} Media Units
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                    {galleryPreviews.map((preview, index) => (
                                        <Motion.div 
                                            key={index}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative aspect-square rounded-[1.5rem] bg-gray-50 dark:bg-[#030712] border border-gray-100 dark:border-white/5 overflow-hidden group shadow-lg"
                                        >
                                            <img src={preview} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <button 
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                className="absolute inset-0 bg-red-600/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                            >
                                                <HiOutlineTrash className="text-2xl" />
                                            </button>
                                        </Motion.div>
                                    ))}
                                    <Motion.button 
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => galleryInputRef.current.click()}
                                        className="aspect-square rounded-[1.5rem] bg-[#030712] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-gray-700 hover:border-orange/20 hover:text-orange transition-all"
                                    >
                                        <HiOutlinePlus className="text-3xl mb-2" />
                                        <span className="text-[8px] font-black uppercase tracking-widest">Add Media</span>
                                    </Motion.button>
                                </div>
                                <input type="file" multiple className="hidden" ref={galleryInputRef} onChange={handleGalleryChange} accept="image/*" />
                            </div>

                            {/* Integrated Upload Progress */}
                            {isLoading && (
                                <Motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-8 bg-orange/5 border border-orange/10 rounded-[2.5rem] space-y-5"
                                >
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-orange animate-ping" />
                                            <span className="text-[10px] font-black text-orange uppercase tracking-widest">Synchronizing Project Data...</span>
                                        </div>
                                        <span className="text-[10px] font-black text-white bg-black px-3 py-1 rounded-full">{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-black/40 rounded-full overflow-hidden p-[2px]">
                                        <Motion.div 
                                            className="h-full bg-gradient-to-r from-orange to-orange-400 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ ease: "linear" }}
                                        />
                                    </div>
                                </Motion.div>
                            )}
                        </Motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Orchestration */}
                <div className="flex items-center justify-between pt-10 border-t border-white/5">
                    <button 
                        type="button"
                        onClick={step === 1 ? onCancel : () => setStep(1)}
                        className="flex items-center gap-3 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.3em] transition-all group"
                    >
                        {step === 2 && <HiOutlineChevronLeft className="text-lg group-hover:-translate-x-1 transition-transform" />}
                        {step === 1 ? 'Discard Changes' : 'Back to Essence'}
                    </button>
                    
                    <button 
                        type={step === 2 ? "submit" : "button"}
                        onClick={step === 1 ? handleNext : undefined}
                        disabled={isLoading}
                        className={`min-w-[200px] px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-4 ${
                            isLoading 
                                ? 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5' 
                                : 'bg-white text-black hover:bg-orange hover:text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)]'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-orange border-t-transparent rounded-full animate-spin" />
                                {progress < 100 ? 'Uploading...' : 'Processing...'}
                            </>
                        ) : (
                            <>
                                {step === 1 ? 'Configure Assets' : (project ? 'Commit Changes' : 'Initialize Project')}
                                <HiOutlineChevronRight className="text-lg" />
                            </>
                        )}
                    </button>
                </div>
            </form>
		</div>
	);
};

export default ProjectForm;
