import React, { useEffect, useState } from 'react';

// icons
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import TaskIcon from "@mui/icons-material/Task";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";

import { sendApiRequest } from '../../../services/api';
import MetricsCard from './MetricsCard';

const Metrics = () => {

    const [statNumbers, setStatNumbers] = useState({});
    const [loadingStats, setLoadingStats] = useState(true);


    useEffect(() => {
		const getStats = async () => {
			try {
				const data = await sendApiRequest(`/stats`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				console.log(data);

				setStatNumbers(data.data.stats);
			} catch (err) {
				console.error("Error fetching Stats", err);
			} finally {
				setLoadingStats(false);
			}
		};

		getStats();
	}, []);

    return (
		<>
			<div className="metrics grid">
				<MetricsCard
					isLoading={loadingStats}
					label={"Projects"}
					icon={<DeveloperBoardIcon sx={{ fontSize: 30 }} />}
					statNum={statNumbers.total_projects || 0}
				/>

				<MetricsCard
					isLoading={loadingStats}
					label={"Tasks"}
					icon={<TaskIcon sx={{ fontSize: 30 }} />}
					statNum={statNumbers.total_tasks || 0}
				/>

				<MetricsCard
					isLoading={loadingStats}
					label={"Annotations"}
					icon={<HighlightAltIcon sx={{ fontSize: 30 }} />}
					statNum={statNumbers.total_annotations || 0}
				/>
			</div>
		</>
	);
}

export default Metrics