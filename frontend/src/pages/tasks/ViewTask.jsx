import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

import { sendApiRequest } from "../../services/api.js";
import PageHead from "../../components/page/PageHead";
import LoadingPage from "../../components/ui/LoadingPage";
import LinkBtn from "../../components/ui/LinkBtn";
import Btn from "../../components/ui/Btn";
import NoData from "../../components/ui/NoData";
import FormModal from "../../components/ui/modal/FormModal.jsx";
import NoTask from "./NoTask.jsx"
import AnnotationCanvas from "./AnnotationCanvas.jsx";

const ViewTask = () => {
    const { id } = useParams();
    // const history = useHistory();
	const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [annotations, setAnnotations] = useState([]);
	
    const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

    const [pageTitle, setPageTitle] = useState("Annotate Tasks - LabelBox");


    useEffect(() => {
        const getTaskDetails = async () => {
            try {
				const data = await sendApiRequest(`/tasks/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				setTask(data.data.task);
				setImageUrl(data.data.task.image_url);

				// If annotations exist, set them
				if (data.data.task.annotations) {
					// Ensure the existing annotations are in the correct format
                    setAnnotations(
						data.data.task.annotations.map(
							ann => ({
								id: ann.id,
								label: ann.label,
								x: ann.bounding_box.x,
								y: ann.bounding_box.y,
								width: ann.bounding_box.width,
								height: ann.bounding_box.height,
							})
						)
					);
				}
			} catch (err) {
                toast.error(err?.message || "Couldn't fetch task details");
                console.error("Error fetching task details", err);
            } finally {
                setLoading(false);
            }
        };

        getTaskDetails();
    }, [id]);

	const handleAnnotationsChange = (updatedAnnotations) => {
		console.log("Updated annotations:", updatedAnnotations);
		setAnnotations(updatedAnnotations);
	};

	const handleSubmit = async () => {
		setIsSubmitting(true); // Start loading
		console.log("Submitting annotations:", annotations);
		try {
			// Transform annotations
			const formattedAnnotations = annotations.map(({ id, label, x, y, width, height }) => ({
				id,
				label,
				bounding_box: { x, y, width, height },
			}));
			const jsonData = {
				annotations: formattedAnnotations,
				task_id: id,
			};

			console.log("Formatted annotations:", formattedAnnotations);
			console.log("JSON data:", jsonData);

			const data = await sendApiRequest(`/annotations`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					annotations: formattedAnnotations,
					task_id: id,
				}),
			});
	
			toast.success(data?.message || "Annotation submitted successfully!");
		} catch (error) {
			console.error("Error submitting annotations:", error);
			toast.error(error?.message);
		} finally {
			setIsSubmitting(false); // End loading
		}
	};

	// If task is still loading, show loading page
    if (loading) return <LoadingPage />;

	if (task == null) {
		return <NoTask />;
	}

    const linkBtn = <LinkBtn txt={"Annotate"} link={`/projects/${id}/edit`} />;

	return (
		<>
			<div className="task-details">
				<PageHead title={`Draw to annotate this image`} headBtn={``} />
			</div>

			{imageUrl ? (
				<>
					<AnnotationCanvas
						imageUrl={imageUrl}
						annotations_data={annotations}
						onAnnotationsChange={handleAnnotationsChange}
					/>
					<Btn
						txt="Submit Annotations"
						type="button"
						isLoading={isSubmitting}
						handleClick={handleSubmit}
					/>
				</>
			) : (
				<p>Loading image...</p>
			)}
		</>
	);
};

export default ViewTask;
