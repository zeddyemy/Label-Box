import React from "react";
import { Helmet } from "react-helmet-async";

import NoData from "../../components/ui/NoData";
import LinkBtn from "../../components/ui/LinkBtn";

const NoTask = () => {
	const linkBtn = <LinkBtn txt={"View Projects"} link="/projects" />;

	return (
		<>
			<div id="no-tasks">
				<Helmet>
					<title>{`404 - Task not Found or Deleted - LabelBoX`}</title>
				</Helmet>

				<NoData
					title={"Task not Found or Deleted"}
					headBtn={linkBtn}
				/>
			</div>
		</>
	);
};

export default NoTask;
