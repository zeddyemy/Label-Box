import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import NewProject from "./pages/projects/NewProject";
import ProjectTasks from "./pages/projects/ProjectTasks";
import ViewTask from "./pages/tasks/ViewTask";
import EditProject from "./pages/projects/EditProject";

import UseLayout from "./components/layout/UseLayout";

function App() {
	const notify = () => toast("Wow so easy!");

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" />} />
					<Route
						path="/dashboard"
						element={<UseLayout element={<Dashboard />} />}
					/>

					<Route
						path="/projects"
						element={<UseLayout element={<Projects />} />}
					/>
					<Route
						path="/projects/new"
						element={<UseLayout element={<NewProject />} />}
					/>
					<Route
						path="/projects/:id/edit"
						element={<UseLayout element={<EditProject />} />}
					/>
					<Route
						path="/projects/:id/tasks"
						element={<UseLayout element={<ProjectTasks />} />}
					/>

					<Route
						path="/tasks/:id"
						element={<UseLayout element={<ViewTask />} />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;