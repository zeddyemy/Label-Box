import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import { newProjectSchema } from "../../services/validationSchemas";
import { sendApiRequest, fetchProject } from "../../services/api";

import LoadingPage from "../../components/ui/LoadingPage";
import IcoInput from "../../components/ui/icoInput/IcoInput";
import Btn from "../../components/ui/Btn";
import PageHead from "../../components/page/PageHead";

import "../../assets/library/esho/form.css";

const EditProject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
	const [initialValues, setInitialValues] = useState({
		name: "",
		description: "",
	});

    useEffect(() => {
        const getProject = async () => {
			try {
				const data = await fetchProject(id);
				setInitialValues(data.project);
			} catch (error) {
				console.error("Error fetching project:", error);
			} finally {
				setLoading(false);
			}
		};

        getProject();
    }, [id]);

    const handleSubmit = async (values, { setSubmitting }) => {
		const formattedValues = {
			...values,
		};

		try {
			const data = await sendApiRequest(`/projects/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formattedValues),
			});

			toast.success(data?.message);
			navigate(`/projects/${id}tasks`);
		} catch (error) {
			console.error("Error updating project:", error);
			toast.error(error?.message);
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) return <LoadingPage />;

	return (
		<>
			<div id="edit-project">
				<Helmet>
					<title>Edit Project - LabelBox</title>
				</Helmet>

				<PageHead title={"Edit Project"} />

				<div className="form-container">
					<div id="project-form" className="card form-wrapper">
						<Formik
							initialValues={initialValues}
							enableReinitialize
							validationSchema={newProjectSchema}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting, values }) => (
								<Form>
									<div className="form-groups">
										<div className="form-group">
											<label className="label">
												Name
											</label>
											<Field
												type="text"
												name="name"
												className="rounded form-element"
											/>
											<ErrorMessage
												name="name"
												component="div"
												className="err-msg"
											/>
										</div>

										<div className="form-group">
											<label className="label">
												Description
											</label>
											<Field
												as={IcoInput}
												icon={""}
												type="text"
												name="description"
												className="rounded form-element"
											/>
											<ErrorMessage
												name="description"
												component="div"
												className="err-msg"
											/>
										</div>
									</div>

									<Btn
										txt={"Submit"}
										type="submit"
										isLoading={isSubmitting}
									/>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProject;
