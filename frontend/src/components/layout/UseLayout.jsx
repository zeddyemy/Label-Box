import React from "react";
import { ToastContainer, toast } from "react-toastify";

import MainLayout from "./MainLayout";

const UseLayout = ({ element, ...rest }) => {
	return (
		<>
			<MainLayout>{element}</MainLayout>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
};

export default UseLayout;
