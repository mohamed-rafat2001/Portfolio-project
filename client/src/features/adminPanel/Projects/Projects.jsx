import { useState } from "react";
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

const Projects = () => {
	const { projects, isLoading: isFetching } = useProjects();
	const { mutate: createProj, isLoading: isCreating } = useCreateProj();
	const { mutate: updateProj, isLoading: isUpdating } = useUpdateProj();
	const { mutate: deleteProj } = useDeleteProj();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState(null);

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
		<div className="space-y-8">
			<AdminHeader
				title="Projects"
				description="Manage your portfolio projects and case studies"
				icon={<HiOutlineBriefcase />}
				action={{
					label: "Add Project",
					icon: <HiOutlinePlus />,
					onClick: handleAdd,
				}}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
				<AnimatePresence mode="popLayout">
					{projects?.map((project) => (
						<ProjectCard
							key={project._id}
							project={project}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</AnimatePresence>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingProject ? "Edit Project" : "Add Project"}
				maxWidth="max-w-2xl"
			>
				<ProjectForm
					project={editingProject}
					onSubmit={handleSubmit}
					isLoading={isCreating || isUpdating}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default Projects;
