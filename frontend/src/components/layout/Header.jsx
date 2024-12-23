// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Formik, Form, Field, ErrorMessage } from "formik";

import defProfile from "../../assets/img/profile.png";

const Header = ({ handleSidebarToggle }) => {

	return (
		<header id="header" className="header">
			<div className="container flex">
				<div
					className="hamburger-btn flex flex-center"
					onClick={handleSidebarToggle}
				>
					<div className="ico hamburger flex flex-center">
						<MenuIcon sx={{ fontSize: 50 }} />
					</div>
				</div>

				<div className="header-utils flex">
					<div className="search-box">
						<Formik onSubmit={() => {}}>
							{({ isSubmitting }) => (
								<div className="search-wrap flex flex-center">
									<Form>
										<Field
											id="search-field"
											type="text"
											name="s"
											className="rounded form-control search-field"
											placeholder="What would you like to find?"
										/>
									</Form>
								</div>
							)}
						</Formik>
					</div>
				</div>

				<div className="header-icons flex">
					<Link to="/profile">
						<div className="profile-ico">
							<div className="profile-img fitImg">
								<img src={defProfile} alt="profile image" />
							</div>
						</div>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
