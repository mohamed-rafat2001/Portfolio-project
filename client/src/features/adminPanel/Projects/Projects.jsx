import { useState, useEffect } from "react";
import { m as Motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineSparkles } from "react-icons/hi2";
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
	const limit = 3;
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

	if (isFetching) return <LoadingState message="Loading your portfolio..." />;

	return (
		<div className="space-y-12 pb-20">
            <AdminHeader
                title="Project Gallery"
                description="Showcase your best work and technical case studies"
                icon={<HiOutlineSparkles />}
                action={{
                    label: "Add Project",
                    icon: <HiOutlinePlus />,
                    onClick: handleAdd,
                }}
            />

			<div className="flex justify-end">
				<Pagination 
					page={page} 
					totalResults={totalResults} 
					limit={limit} 
					setPage={setPage} 
					size="small"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
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

            {projects?.length === 0 && (
				<div className="text-center py-24 bg-white dark:bg-[#0b1120] rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl">
					<div className="w-24 h-24 bg-gray-50 dark:bg-[#030712] rounded-[2rem] flex items-center justify-center text-gray-400 dark:text-gray-700 text-5xl mx-auto mb-10 border border-gray-100 dark:border-white/5">
						<HiOutlineSparkles />
					</div>
					<h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">
						No projects found
					</h3>
					<p className="text-gray-500 mb-12">
						Your portfolio currently has no public entries.
					</p>
                    <button 
                        onClick={handleAdd}
                        className="px-12 py-5 bg-orange text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-orange/20 shadow-2xl transition-all"
                    >
                        + Create Your First Project
                    </button>
				</div>
			)}

			<Pagination 
				page={page} 
				totalResults={totalResults} 
				limit={limit} 
				setPage={setPage} 
                size="small"
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingProject ? "Detailed Project View" : "Architect New Project"}
				maxWidth="max-w-3xl"
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
