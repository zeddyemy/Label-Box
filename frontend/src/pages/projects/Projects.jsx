import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { CircularProgress, Typography, Pagination } from "@mui/material";

import { sendApiRequest } from "../../services/api.js";
import PageHead from "../../components/page/PageHead";
import LoadingPage from "../../components/ui/LoadingPage";
import LinkBtn from "../../components/ui/LinkBtn";
import NoData from "../../components/ui/NoData";
import Table from "../../components/ui/Table.jsx";

import "./projects.css";

const Projects = () => {
	const navigate = useNavigate();
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingTable, setLoadingTable] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		
		const getProjects = async () => {
			try {
				const data = await sendApiRequest(
					`/projects?page=${page}&per_page=6`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				console.log(data);

				setProjects(data.data.projects);
				setTotalPages(data.data.total_pages);
			} catch (err) {
				toast.error(err?.message || "Couldn't fetch projects");
				console.error("Error fetching Projects", err);
			} finally {
				setLoading(false);
				setLoadingTable(false);
			}
		};

		getProjects();
	}, [page]);

	const handlePageChange = (event, value) => {
		setLoadingTable(true);
		setPage(value);
	};

	const handleViewDetails = (id) => {
		navigate(`/projects/${id}/tasks`);
	};

	// Define columns and data for the Table component
	const columns = [
		{ field: "id", headerName: "ID", minWidth: 20, type: "number" },
		{ field: "name", headerName: "Name", minWidth: 50, type: "string" },
		{
			field: "description",
			headerName: "Description",
			minWidth: 70,
			type: "string",
		},
		{ field: "created_at", headerName: "Date Created ", minWidth: 110, type: "date" },
	];

    if (loading) return <LoadingPage />;

    const linkBtn = <LinkBtn txt={"Create New Project"} link="/projects/new" />;

	return (
		<div id="projects">
			<Helmet>
				<title>Projects - LabelBox</title>
			</Helmet>

			{projects.length > 0 ? (
				<>
					<PageHead title={"Projects"} headBtn={linkBtn} />
					<Table
						isLoading={loadingTable}
						columns={columns}
						data={projects}
						foot={true}
						actions={true}
						handleViewDetails={handleViewDetails}
						paginate={{ totalPages, page, handlePageChange }}
					/>
				</>
			) : (
				<NoData title={"No Projects available"} headBtn={linkBtn} />
			)}
		</div>
	);
};

export default Projects;
