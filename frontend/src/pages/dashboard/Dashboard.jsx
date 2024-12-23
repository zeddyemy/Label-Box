// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import "./dashboard.css";
import { sendApiRequest } from "../../services/api";
import Metrics from "./metrics/Metrics";
import Table from "../../components/ui/Table"; // Custom Table component
import PageHead from "../../components/page/PageHead";
import LinkBtn from "../../components/ui/LinkBtn";

const Dashboard = () => {
	const [projects, setProjects] = useState([]);
	const [loadingProjectTable, setLoadingProjectTable] = useState(true);
	const [projectPage, setProjectPage] = useState(1);
	const [projectTotalPages, setProjectTotalPages] = useState(1);

	useEffect(() => {
		const getProjects = async () => {
			try {
				const data = await sendApiRequest(
					`/projects?page=${projectPage}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				console.log(data);

				setProjects(data.data.projects);
				setProjectTotalPages(data.data.total_pages);
			} catch (err) {
				console.error("Error fetching Projects", err);
			} finally {
				setLoadingProjectTable(false);
			}
		};

		getProjects();
	}, [projectPage]);

	const linkBtn = <LinkBtn txt={"Create New Project"} link="/projects/new" />;

	// Define columns and data for the Table component
	const columns = [
		{ field: "id", headerName: "ID", minWidth: 20 },
		{ field: "name", headerName: "Name", minWidth: 50 },
		{
			field: "description",
			headerName: "Description",
			minWidth: 170,
		},
		{ field: "created_at", headerName: "Date Created ", minWidth: 110 },
	];

	return (
		<>
			<div id="dashboard">
				<Helmet>
					<title>Dashboard - LabelBox</title>
				</Helmet>

				<PageHead title={"Dashboard"} headBtn={linkBtn} />

				<Metrics />

				<section>
					<Table
						head={"Projects Overview"}
						isLoading={loadingProjectTable}
						columns={columns}
						data={projects}
					/>
				</section>
			</div>
		</>
	);
};

export default Dashboard;
