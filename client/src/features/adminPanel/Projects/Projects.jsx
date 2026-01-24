import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineBriefcase } from "react-icons/hi2";
import useProjects from "./hooks/useProjects";
import useCreateProj from "./hooks/useCreateProj";
import useUpdateProj from "./hooks/useUpdateProj";
import useDeleteProj from "./hooks/useDeleteProj";
import ProjectCard from "./components/ProjectCard";
import ProjectForm from "./components/ProjectForm";
import Modal from "../../../shared/components/ui/Modal";
import AdminHeader from "../../../shared/components/ui/AdminHeader";
import LoadingState from "../../../shared/components/ui/LoadingState";
import Pagination from "../../../shared/components/ui/Pagination";

const Projects = () => {
	const [page, setPage] = useState(1);
	const limit = 6;
	const { projects, isLoading: isFetching, totalResults } = useProjects({ page, limit });
	const { mutate: createProj, isLoading: isCreating, progress: createProgress } = useCreateProj();
	const { mutate: updateProj, isLoading: isUpdating, progress: updateProgress } = useUpdateProj();
	const { mutate: deleteProj } = useDeleteProj();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState(null);

    // Re-check page if results are zero (e.g. after delete)
    useEffect(() => {
        if (projects && projects.length === 0 && page > 1) setPage(page - 1);
    }, [projects, page]);

	const handleAdd = () => {
		setEditingProject(null);
		setIsModalOpen(true);
	};

	const handleEdit = (project) => {
		setEditingProject(project);
		setIsModalOpen(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this project?")) {
			deleteProj(id);
		}
	};

	const handleSubmit = (formData) => {
		if (editingProject) {
			updateProj(
				{ id: editingProject._id, data: formData },
				{
					onSuccess: () => setIsModalOpen(false),
				}
			);
		} else {
			createProj(formData, {
				onSuccess: () => setIsModalOpen(false),
			});
		}
	};

	if (isFetching) return <LoadingState message="Loading projects..." />;

	return (
		<div className="space-y-14 pb-20">
            {/* Redesigned Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">
                        Projects
                    </h1>
                    <p className="text-gray-500 font-medium text-lg">
                        Manage your portfolio projects and case studies.
                    </p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="px-10 py-5 bg-orange text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 transition-transform shadow-2xl shadow-orange/30"
                >
                    <HiOutlinePlus className="text-xl" />
                    Add Project
                </button>
            </header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				<AnimatePresence mode="popLayout">
					{projects?.map((project, index) => (
						<ProjectCard
							key={project._id}
							project={project}
                            index={index + (page - 1) * limit}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</AnimatePresence>
			</div>

			<Pagination 
				page={page} 
				totalResults={totalResults} 
				limit={limit} 
				setPage={setPage} 
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingProject ? "Edit Project" : "New Project"}
                hideHeader={true}
				maxWidth="max-w-2xl"
			>
				<ProjectForm
					project={editingProject}
					onSubmit={handleSubmit}
					isLoading={isCreating || isUpdating}
                    progress={createProgress || updateProgress}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default Projects;
