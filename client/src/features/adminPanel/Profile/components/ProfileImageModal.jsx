import { useState, useRef } from "react";
import { HiOutlineArrowUpTray, HiOutlineCloudArrowUp, HiOutlineXCircle } from "react-icons/hi2";
import { motion as Motion } from "framer-motion";
import Modal from "../../../../shared/components/ui/Modal";
import { updateProfileImg } from "../services/profile"; // I'll create this service
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const ProfileImageModal = ({ isOpen, onClose }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const queryClient = useQueryClient();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("profileImg", file);

        try {
            await updateProfileImg(formData, (percent) => {
                setProgress(percent);
            });
            toast.success("Profile image updated successfully!");
            queryClient.invalidateQueries(["User"]);
            handleClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        setFile(null);
        setPreview(null);
        setProgress(0);
        setIsUploading(false);
        onClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            title="Upload Profile Image"
            maxWidth="max-w-md"
        >
            <div className="space-y-8">
                <div 
                    onClick={() => fileInputRef.current.click()}
                    className={`relative aspect-square rounded-[2.5rem] bg-[#030712] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all ${
                        preview ? 'border-orange/40' : 'border-white/10 hover:border-orange/20'
                    }`}
                >
                    <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center p-8">
                            <HiOutlineCloudArrowUp className="text-5xl text-gray-700 mb-4 mx-auto" />
                            <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                                Click to select or drop an image
                            </p>
                            <span className="text-[10px] text-gray-600 mt-2 block">
                                PNG, JPG or WEBP (Max 5MB)
                            </span>
                        </div>
                    )}

                    {preview && !isUploading && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                setPreview(null);
                            }}
                            className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                        >
                            <HiOutlineXCircle className="text-2xl" />
                        </button>
                    )}
                </div>

                {isUploading && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-orange">Uploading...</span>
                            <span className="text-white">{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <Motion.div 
                                className="h-full bg-orange"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-2xl flex items-center justify-center gap-3 ${
                        file && !isUploading
                            ? "bg-orange text-white"
                            : "bg-white/5 text-white/20 cursor-not-allowed"
                    }`}
                >
                    <HiOutlineArrowUpTray className="text-lg" />
                    {isUploading ? "Processing..." : "Confirm Upload"}
                </button>
            </div>
        </Modal>
    );
};

export default ProfileImageModal;
