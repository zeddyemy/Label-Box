import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { CircularProgress, Typography, Pagination } from "@mui/material";

import { sendApiRequest } from "../../services/api.js";
import PageHead from "../../components/page/PageHead";
import LoadingPage from "../../components/ui/LoadingPage";
import LinkBtn from "../../components/ui/LinkBtn";
import Btn from "../../components/ui/Btn";
import NoData from "../../components/ui/NoData";
import Table from "../../components/ui/Table.jsx";
import FormModal from "../../components/ui/modal/FormModal.jsx";
import ProjectInfo from "./ProjectInfo.jsx";
import NoProject from "./NoProject.jsx";
import AddTaskForm from "./AddTaskForm.jsx";
import "./project_details.css";


const ProjectTasks = () => {
	const { id } = useParams();
	const navigate = useNavigate();
    const [formModalOpen, setFormModalOpen] = useState(false);
    // const formModalRef = useRef(null); // Ref for modal to detect outside clicks
	const [project, setProject] = useState(null);
    const [idDeleting, setIsDeleting] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingTable, setLoadingTable] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const [pageTitle, setPageTitle] = useState("Project Tasks - LabelBox");

    const handleFormModalToggle = () => {
		setFormModalOpen(!formModalOpen);
	};

	const fetchTasks = async () => {
		try {
			const data = await sendApiRequest(`/projects/${id}/tasks`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			setTasks(data.data.tasks);
		} catch (err) {
			toast.error(err?.message || "Couldn't fetch project tasks");
			console.error("Error fetching project tasks", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {

		const getProjectDetails = async () => {
			try {
				const data = await sendApiRequest(`/projects/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				setProject(data.data.project);
			} catch (err) {
				toast.error(err?.message || "Couldn't fetch project details");
				console.error("Error fetching project details", err);
			} finally {
				setLoading(true);
			}
		};

		getProjectDetails();
		fetchTasks();
	}, [id]);

    const handlePageChange = (event, value) => {
		setLoadingTable(true);
		setPage(value);
	};

    const handleViewDetails = (task_id) => {
		navigate(`/tasks/${task_id}`);
	};

	// Define columns and data for the Table component
	const tasksColumns = [
		{ field: "id", headerName: "ID", minWidth: 20, type: "number" },
		{ field: "image_url", headerName: "Image", minWidth: 50, type: "image" },
		{ field: "created_at", headerName: "Date Created ", minWidth: 110, type: "date" },
	];

	if (loading) return <LoadingPage />;

	if (project == null) {
		return <NoProject />;
	}

	const linkBtn = <LinkBtn txt={"Edit"} link={`/projects/${id}/edit`} />;
	const addTaskLinkBtn = (
		<Btn
			txt={"Add Task"}
			type="button"
			handleClick={handleFormModalToggle}
		/>
	);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const deleteProject = async () => {
		setIsDeleting(true);
		try {
			const data = await sendApiRequest(`/projects/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			toast.success(data?.message);
			navigate(`/projects`);
		} catch (error) {
			console.error("Error DELETING project:", error);
			toast.error(err?.message);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div id="project-tasks">
			<Helmet>
				<title>{`${project.name} - LabelBox`}</title>
			</Helmet>

			{tasks.length >= 0 ? (
				<>
					<PageHead title={`${project.name}`} headBtn={linkBtn} />

					<div className="project-details">
						<div className="project-data card grid">
							<ProjectInfo label="Name" value={project.name} />
							<ProjectInfo
								label="Description"
								value={project.description}
							/>
							<ProjectInfo
								label="Date Created"
								value={formatDate(project.created_at)}
							/>
						</div>

						<PageHead title={`Tasks`} headBtn={addTaskLinkBtn} />

						<div className="project-tasks">
							<Table
								isLoading={loadingTable}
								columns={tasksColumns}
								data={tasks}
								foot={true}
								actions={true}
								handleViewDetails={handleViewDetails}
								paginate={{
									totalPages,
									page,
									handlePageChange,
								}}
							/>
						</div>

						<Btn
							txt={`Delete ${project.name}`}
							type="button"
							className="del"
							isLoading={idDeleting}
							handleClick={deleteProject}
						/>
					</div>
				</>
			) : (
				<NoData
					title={"No Tasks available in this project"}
					headBtn={addTaskLinkBtn}
				/>
			)}

			<FormModal
				isActive={formModalOpen}
				handleModalToggle={handleFormModalToggle}
				form_element={
					<AddTaskForm
						project_id={id}
						handleFormModalToggle={handleFormModalToggle}
						onTaskAdded={fetchTasks}
					/>
				}
			/>
		</div>
	);
};

export default ProjectTasks;
