import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

import { newProjectSchema } from "../../services/validationSchemas";
import { sendApiRequest } from "../../services/api";

import IcoInput from "../../components/ui/icoInput/IcoInput";
import Btn from "../../components/ui/Btn";
import PageHead from "../../components/page/PageHead";

import "../../assets/library/esho/form.css";


const NewProject = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const data = await sendApiRequest("/projects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			toast.success(data?.message);
			navigate("/projects");
		} catch (error) {
			console.error("Error adding Project:", error);
			toast.error(err?.message);
		} finally {
			setSubmitting(false);
		}
	};

    return (
		<div id="new-project">
			<Helmet>
				<title>New Project - LabelBox</title>
			</Helmet>

			<PageHead title={"Add New Project"} />

			<div className="form-container">
				<div id="project-form" className="card form-wrapper">
					<Formik
						initialValues={{
							name: "",
							description: "",
						}}
						validationSchema={newProjectSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting, values }) => (
							<Form>
								<div className="form-groups">
									<div className="form-group no-margin">
										<label className="label">Name</label>
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

									<div className="form-group no-margin">
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
	);
}

export default NewProject