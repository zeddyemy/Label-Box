import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingData = () => {
	return (
		<div className="loading-data flex flex-center" style={{ minHeight: "" }}>
			<CircularProgress color="primary" />
		</div>
	);
};

export default LoadingData;
