import {
	Dashboard,
	DirectionsCar,
	Receipt,
	Person,
	ExitToApp,
} from "@mui/icons-material";

import { uniqueId } from "lodash";

const Menuitems = [
	{
		navlabel: true,
		subheader: "Home",
	},
	{
		id: uniqueId(),
		title: "Dashboard",
		icon: Dashboard,
		href: "/dashboard",
	},

	{
		navlabel: true,
		subheader: "Components",
	},
	{
		id: uniqueId(),
		title: "Projects",
		icon: DirectionsCar,
		href: "/projects",
	},

];

export default Menuitems;
