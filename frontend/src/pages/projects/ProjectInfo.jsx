import React from 'react'
import PropTypes from "prop-types";

const ProjectInfo = ({ label, value }) => {
    return (
		<div className="project-info">
			<span className="label">{label}</span>
			<span>{value || "N/A"}</span>
		</div>
	);
}

ProjectInfo.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProjectInfo
