import React from 'react'
import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const Btn = ({ txt, type="submit", isLoading = false, handleClick = () => {}, className="" }) => {
	return (
		<>
			<button
				type={type}
				className={`btn rounded ${className}`}
				disabled={isLoading}
				onClick={handleClick}
			>
				{isLoading ? (
					<CircularProgress size="20px" color="inherit" />
				) : (
					txt
				)}
			</button>
		</>
	);
};

// Optional: Define PropTypes for better type checking
Btn.propTypes = {
    txt: PropTypes.string.isRequired,
    type: PropTypes.string,
    isLoading: PropTypes.bool,
    handleClick: PropTypes.func,
    className: PropTypes.string,
};

export default Btn
