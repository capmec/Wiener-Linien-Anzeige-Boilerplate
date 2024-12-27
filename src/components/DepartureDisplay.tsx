// src/components/DepartureDisplay.tsx
import React from 'react';

interface Departure {
	line: string;
	destination: string;
	countdown: number;
}

interface DepartureDisplayProps {
	departures: Departure[];
}

const DepartureDisplay: React.FC<DepartureDisplayProps> = ({ departures }) => {
	return (
		<div className='bg-blue-50 p-4 rounded shadow'>
			<h1 className='text-2xl font-bold text-center'>Abfahrtszeiten</h1>
			<ul className='list-none mt-4 space-y-2'>
				{departures.map((dep, idx) => (
					<li
						key={idx}
						className='flex justify-between'>
						<span className='font-semibold'>{dep.line}</span>
						<span>{dep.destination}</span>
						<span className='text-red-600'>{dep.countdown} min</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DepartureDisplay;
