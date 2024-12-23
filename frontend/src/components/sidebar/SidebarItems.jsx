import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import Menuitems from "./MenuItems.js";

const SidebarItems = ({ handleSidebarToggle }) => {
	const { pathname } = useLocation();
	const pathDirect = pathname;

	return (
		<>
			{Menuitems.map((item) => {
				// {/********SubHeader**********/}
				if (item.subheader) {
					return (
						<li className="nav-title" key={item.subheader}>
							{item.subheader}
						</li>
					);

					// {/********If Sub Menu**********/}
					/* eslint no-else-return: "off" */
				} else {
					return (
						<li className="nav-item" key={item.id}>
							<Link
								to={item.href}
								className="flex"
								onClick={handleSidebarToggle} // Close sidebar after navigation
							>
								<span className="ico"> </span>
								<span className="name"> {item.title} </span>
							</Link>
						</li>
					);
				}
			})}
		</>
	);
};

export default SidebarItems;
