import React from 'react'

import "./ico-input.css"

const IcoInput = ({ icon, ...props }) => {
	return (
		<>
			<div className="ico-input">
				<i className="icon"> {icon} </i>
				<input {...props} />
			</div>
		</>
	);
};

export default IcoInput