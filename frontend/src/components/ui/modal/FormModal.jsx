import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import "./modal.css";

const FormModal = ({ isActive, handleModalToggle, form_element }) => {
	return (
		<>
			<div
				className={`modal flex flex-center ${isActive ? "active" : ""}`}
			>
				<div className="modal-content form-modal card">
					<div className="modal-head">
						<div
							className="modal-close-btn flex flex-center"
							onClick={handleModalToggle}
						>
							<div className="ico close flex flex-center">
								<CloseIcon sx={{ fontSize: 30 }} />
							</div>
						</div>
					</div>

					{form_element}
				</div>
			</div>
		</>
	);
};

export default FormModal;
