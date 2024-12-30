// src/DepartureDisplay.tsx
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

interface DepartureDisplayProps {
	departures: Departure[];
	title: string;
	platform: string;
	towards: string;
}

const DepartureDisplay: React.FC<DepartureDisplayProps> = ({
	departures,
	title,
	platform,
	towards,
}) => {
	if (!departures.length) {
		return (
			<div className='text-red-600 text-center'>
				No departures available for {title}.
			</div>
		);
	}

	return (
		<div className='bg-blue-50 p-6 rounded-lg shadow-lg space-y-6'>
			<h2 className='text-3xl font-bold text-center text-gray-800'>{title}</h2>
			<div className='text-lg font-semibold text-center text-gray-700'>
				Towards: {towards}
			</div>
			{departures.map((departure, idx) => (
				<div
					key={idx}
					className='p-4 border-b border-gray-300'>
					<div className='font-semibold text-gray-900'>
						Platform: {platform}
					</div>
					<div className='text-gray-600'>
						Countdown: {departure.departureTime.countdown} minutes
					</div>
					<div className='text-red-600'>
						Planned:{' '}
						{new Date(departure.departureTime.timePlanned).toLocaleTimeString()}
					</div>
				</div>
			))}
		</div>
	);
};

export default DepartureDisplay;
