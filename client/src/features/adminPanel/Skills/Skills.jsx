import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineSparkles } from "react-icons/hi2";
import useSkills from "./hooks/useSkills";
import useCreateSkill from "./hooks/useCreateSkill";
import useUpdateSkill from "./hooks/useUpdateSkill";
import useDeleteSkill from "./hooks/useDeleteSkill";
import SkillCard from "./components/SkillCard";
import SkillForm from "./components/SkillForm";
import Modal from "../../../shared/components/ui/Modal";
import AdminHeader from "../../../shared/components/ui/AdminHeader";
import LoadingState from "../../../shared/components/ui/LoadingState";
import Pagination from "../../../shared/components/ui/Pagination";

const Skills = () => {
	const [page, setPage] = useState(1);
	const limit = 3;
	const { skills, isLoading: isFetching, totalResults } = useSkills({ page, limit });
	const { mutate: createSkill, isLoading: isCreating } = useCreateSkill();
	const { mutate: updateSkill, isLoading: isUpdating } = useUpdateSkill();
	const { mutate: deleteSkill } = useDeleteSkill();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingSkill, setEditingSkill] = useState(null);

	// Re-check page if results are zero (e.g. after delete)
	useEffect(() => {
		if (skills && skills.length === 0 && page > 1) setPage(page - 1);
	}, [skills, page]);

	const handleAdd = () => {
		setEditingSkill(null);
		setIsModalOpen(true);
	};

	const handleEdit = (skill) => {
		setEditingSkill(skill);
		setIsModalOpen(true);
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this skill?")) {
			deleteSkill(id);
		}
	};

	const handleSubmit = (data) => {
		if (editingSkill) {
			updateSkill(
				{ id: editingSkill._id, data },
				{
					onSuccess: () => setIsModalOpen(false),
				}
			);
		} else {
			createSkill(data, {
				onSuccess: () => setIsModalOpen(false),
			});
		}
	};

	if (isFetching) return <LoadingState message="Loading skills..." />;

	return (
		<div className="space-y-8">
			<AdminHeader
				title="Skills & Expertise"
				description="Manage your technical skills and proficiency levels"
				icon={<HiOutlineSparkles />}
				action={{
					label: "Add Skill",
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

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 pb-20">
				<AnimatePresence mode="popLayout">
					{skills?.map((skill) => (
						<SkillCard
							key={skill._id}
							skill={skill}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</AnimatePresence>
			</div>

			{skills?.length === 0 && (
				<div className="text-center py-24 bg-[#0b1120] rounded-[3rem] border border-white/5 shadow-2xl">
					<div className="w-24 h-24 bg-[#030712] rounded-[2rem] flex items-center justify-center text-gray-700 text-5xl mx-auto mb-10 border border-white/5">
						<HiOutlineSparkles />
					</div>
					<h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">
						No technical records
					</h3>
					<p className="text-gray-500 mb-12">
						Your technical expertise and tools will be visualized here
					</p>
                    <button 
                        onClick={handleAdd}
                        className="px-12 py-5 bg-orange text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-orange/20 shadow-2xl transition-all"
                    >
                        + Add First Skill
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
				title={editingSkill ? "Edit Skill" : "Add Skill Category"}
                maxWidth="max-w-xl"
			>
				<SkillForm
					skill={editingSkill}
					onSubmit={handleSubmit}
					isLoading={isCreating || isUpdating}
					onCancel={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default Skills;
