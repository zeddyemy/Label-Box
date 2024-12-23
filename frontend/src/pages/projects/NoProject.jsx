import React from "react";
import { Helmet } from "react-helmet-async";

import NoData from "../../components/ui/NoData";
import LinkBtn from "../../components/ui/LinkBtn";

const NoProject = () => {
	const linkBtn = <LinkBtn txt={"View Projects"} link="/projects" />;

	return (
		<>
			<div id="no-project">
				<Helmet>
					<title>{`404 - Project not Found or Deleted - LabelBoX`}</title>
				</Helmet>

				<NoData title={"Project not Found or Deleted"} headBtn={linkBtn} />
			</div>
		</>
	);
};

export default NoProject;
