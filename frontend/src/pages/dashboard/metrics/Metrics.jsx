import React, { useEffect, useState } from 'react';

// icons
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import SavingsIcon from "@mui/icons-material/Savings";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import SubjectIcon from "@mui/icons-material/Subject";

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
					icon={<AirplanemodeActiveIcon sx={{ fontSize: 30 }} />}
					statNum={statNumbers.total_trips || 0}
				/>

				<MetricsCard
					isLoading={loadingStats}
					label={"Tasks"}
					icon={<PriceCheckIcon sx={{ fontSize: 30 }} />}
					statNum={statNumbers.total_expenses || 0}
				/>

				<MetricsCard
					isLoading={loadingStats}
					label={"Annotations"}
					icon={<SubjectIcon sx={{ fontSize: 30 }} />}
					statNum={statNumbers.total_itineraries || 0}
				/>
			</div>
		</>
	);
}

export default Metrics