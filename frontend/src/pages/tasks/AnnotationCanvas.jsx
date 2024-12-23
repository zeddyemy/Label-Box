import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Image as KonvaImage } from "react-konva";
import { v4 as uuidv4 } from "uuid";

import Btn from "../../components/ui/Btn";

import "./AnnotationCanvas.css";

const AnnotationCanvas = ({ imageUrl, annotations_data, onAnnotationsChange }) => {
	const stageRef = useRef(null);
	const [annotations, setAnnotations] = useState(annotations_data);
	const [newRect, setNewRect] = useState(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [currentLabel, setCurrentLabel] = useState("");
	const [currentAnnotation, setCurrentAnnotation] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 700, height: 500 });
    const [scale, setScale] = useState(1);

	// Load image
	const [image] = useImage(imageUrl);

    useEffect(() => {
		if (image) {
			const maxWidth = 800;
			const maxHeight = 600;
			let scaleFactor = 1;

			if (image.width > maxWidth || image.height > maxHeight) {
				const widthRatio = maxWidth / image.width;
				const heightRatio = maxHeight / image.height;
				scaleFactor = Math.min(widthRatio, heightRatio);
			}

			setScale(scaleFactor);
			setImageDimensions({
				width: image.width * scaleFactor,
				height: image.height * scaleFactor,
			});

			// Adjust Stage size based on scaled image
			if (stageRef.current) {
				stageRef.current.width(image.width * scaleFactor);
				stageRef.current.height(image.height * scaleFactor);
			}
		}
	}, [image]);

	const handleMouseDown = (e) => {
		const { x, y } = e.target.getStage().getPointerPosition();
		setNewRect({
			x,
			y,
			width: 0,
			height: 0,
			id: uuidv4(),
		});
		setIsDrawing(true);
	};

	const handleMouseMove = (e) => {
		if (!isDrawing || !newRect) return;
		const { x, y } = e.target.getStage().getPointerPosition();
		setNewRect({
			...newRect,
			width: x - newRect.x,
			height: y - newRect.y,
		});
	};

	const handleMouseUp = () => {
		if (newRect) {
			setCurrentAnnotation(newRect);
			setShowModal(true);
			setNewRect(null);
			setIsDrawing(false);
		}
	};

	const handleModalSubmit = () => {
		if (currentLabel.trim() !== "") {
			const updatedAnnotations = [
				...annotations,
				{ ...currentAnnotation, label: currentLabel },
			];
			setAnnotations(updatedAnnotations);
			onAnnotationsChange(updatedAnnotations);
			setCurrentLabel("");
			setCurrentAnnotation(null);
			setShowModal(false);
		} else {
			alert("Please enter a label.");
		}
	};

	const handleModalCancel = () => {
		setCurrentLabel("");
		setCurrentAnnotation(null);
		setShowModal(false);
	};

	const handleDelete = (id) => {
		const updatedAnnotations = annotations.filter((ann) => ann.id !== id);
		setAnnotations(updatedAnnotations);
		onAnnotationsChange(updatedAnnotations);
	};

	return (
		<div>
			<Stage
				width={imageDimensions.width}
				height={imageDimensions.height}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				ref={stageRef}
				style={{ border: "1px solid grey", margin: "0 auto" }}
			>
				<Layer>
					<KonvaImage image={image} scale={{ x: scale, y: scale }} />
					{annotations.map((ann) => (
						<React.Fragment key={ann.id}>
							<Rect
								x={ann.x}
								y={ann.y}
								width={ann.width}
								height={ann.height}
								stroke="green"
								strokeWidth={2}
							/>
							<Text
								x={ann.x}
								y={ann.y - 20}
								text={ann.label}
								fontSize={16}
								fill="green"
							/>
						</React.Fragment>
					))}
					{newRect && (
						<Rect
							x={newRect.x}
							y={newRect.y}
							width={newRect.width}
							height={newRect.height}
							stroke="blue"
							strokeWidth={2}
						/>
					)}
				</Layer>
			</Stage>

			{/* Annotation Modal */}
			{showModal && (
				<div className="annotate-modal">
					<div className="modal-content card">
						<h3>Enter Label for Annotation</h3>
						<input
							type="text"
							value={currentLabel}
							onChange={(e) => setCurrentLabel(e.target.value)}
							placeholder="Label"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleModalSubmit();
								}
							}}
							autoFocus
							className="form-element"
						/>
						<div className="modal-buttons">
							<Btn
								txt={"Save"}
								type="submit"
								handleClick={handleModalSubmit}
								className=""
							/>
							<Btn
								txt={"Cancel"}
								handleClick={handleModalCancel}
								className="del"
							/>
						</div>
					</div>
				</div>
			)}

			<div className="captured-annotations">
				<h3>Annotations</h3>
				<ul>
					{annotations.map((ann) => (
						<li key={ann.id} className="flex">
							<strong>{ann.label}</strong> - ({Math.round(ann.x)},{" "}
							{Math.round(ann.y)}),
							{Math.round(ann.width)}x{Math.round(ann.height)}
							<Btn
								txt={"Delete"}
								handleClick={() => handleDelete(ann.id)}
								className="del"
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

// Custom hook to load image
const useImage = (url) => {
    const [image, setImage] = useState(null);
    React.useEffect(() => {
        const img = new window.Image();
        img.src = url;
        img.crossOrigin = 'Anonymous'; // Handle CORS if images are hosted externally
        img.onload = () => setImage(img);
    }, [url]);

    return [image];
};

export default AnnotationCanvas;
