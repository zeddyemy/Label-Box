import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { profileEditSchema } from "../../services/validationSchemas";
import { sendApiRequest } from "../../services/api";

import Btn from "../../components/ui/Btn";
import LinkBtn from "../../components/ui/LinkBtn";

const AddTaskForm = ({ project_id = "", handleFormModalToggle, onTaskAdded }) => {
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState(null);
	const [taskImg, setTaskImg] = useState("");

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			setTaskImg(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const formData = new FormData();

			formData.append("project_id", values.project_id);
			if (selectedFile) {
				formData.append("task_img", selectedFile);
			}

			const data = await sendApiRequest("/tasks", {
				method: "POST",
				headers: {},
				body: formData,
			});
			console.log(data);

			toast.success(data?.message);
			handleFormModalToggle();
			onTaskAdded();
			navigate(`/projects/${project_id}/tasks`);
		} catch (error) {
			console.error("Error adding task:", error);
			toast.error(error?.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<Formik
				initialValues={{
					task_img: "",
					project_id: project_id,
				}}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="form-task-img">
							<div className="task-img-container">
								<label htmlFor="task_img">Task Image</label>
								<div className="task-img fit-img">
									<img src={taskImg || ""} alt="task image" />
								</div>

								<input
									type="file"
									id="task_img"
									accept="image/*"
									style={{ display: "none" }}
									onChange={handleFileChange}
								/>
								<Btn
									txt={"Upload Image"}
									type="button"
									className="upload-button"
									handleClick={() =>
										document
											.getElementById("task_img")
											.click()
									}
								/>
							</div>

							<Field
								type="text"
								name="project_id"
								value={project_id}
								hidden
							/>

							<Btn
								txt={"Save"}
								type="submit"
								isLoading={isSubmitting}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AddTaskForm;
