import React from 'react'

import LoadingData from '../../../components/ui/LoadingData';

const MetricsCard = ({ isLoading = false, label, icon, statNum }) => {
    return (
		<>
			<div className="card metrics-card">
				<div className="metrics-head flex space-between">
					<div className="label">{label}</div>
					<div
						className={`${label.toLowerCase()}-ico flex flex-center`}
					>
						{icon}
					</div>
				</div>
				<div className="stat">
					{isLoading ? <LoadingData /> : statNum}
				</div>
			</div>
		</>
	);
}

export default MetricsCard
