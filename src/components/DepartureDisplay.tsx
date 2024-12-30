import React from 'react';

type Departure = {
	departureTime: {
		timePlanned: string;
		timeReal: string;
		countdown: number;
	};
	vehicle: {
		name: string;
		towards: string;
		platform: string;
	};
};

type DepartureDisplayProps = {
	departures: Departure[];
};

const DepartureDisplay: React.FC<DepartureDisplayProps> = ({ departures }) => {
	// Group departures by platform
	const platforms = departures.reduce(
		(acc: { [key: string]: Departure[] }, dep) => {
			const platform = dep.vehicle.platform; // Ensure we are correctly using the platform field
			if (!acc[platform]) acc[platform] = [];
			acc[platform].push(dep);
			return acc;
		},
		{},
	);

	return (
		<div className='space-y-4'>
			{Object.entries(platforms).map(([platform, departures]) => (
				<div
					key={platform}
					className='bg-blue-50 p-4 rounded shadow-md'>
					<h1 className='text-2xl font-bold text-center'>Abfahrtszeiten</h1>
					<div className='text-center text-lg font-semibold'>
						Platform: {platform}
					</div>
					<div className='mt-4'>
						{departures.map((dep, idx) => (
							<div
								key={idx}
								className='mb-2'>
								<div className='font-semibold'>
									Train towards: {dep.vehicle.towards}
								</div>
								<div className='text-gray-600'>
									Train name: {dep.vehicle.name}
								</div>
								<div className='text-red-600'>
									In: {dep.departureTime.countdown} minutes
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default DepartureDisplay;
