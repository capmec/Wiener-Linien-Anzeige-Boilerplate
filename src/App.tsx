// src/App.tsx
import React, { useEffect, useState } from 'react';
import { fetchStopData } from './services/wienerLinienService';
import DepartureDisplay from './components/DepartureDisplay';

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

const App: React.FC = () => {
	const [stop3448Departures, setStop3448Departures] = useState<Departure[]>([]);
	const [stop3445Departures, setStop3445Departures] = useState<Departure[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [stop3448Data, stop3445Data] = await Promise.all([
					fetchStopData('3448'),
					fetchStopData('3445'),
				]);
				setStop3448Departures(stop3448Data);
				setStop3445Departures(stop3445Data);
			} catch (err) {
				console.error(err);
				setError('Failed to fetch departure data.');
			}
		};

		fetchData();
	}, []);

	if (error) {
		return <div className='text-red-500 text-center'>{error}</div>;
	}

	return (
		<div className='space-y-8'>
			<DepartureDisplay
				departures={stop3448Departures}
				title='Departures towards Raxstraße, Rudolfshügelgasse'
				platform='Platform 1'
				towards='Raxstraße, Rudolfshügelgasse'
			/>
			<DepartureDisplay
				departures={stop3445Departures}
				title='Departures towards Bruno-Marek-Allee'
				platform='Platform 2'
				towards='Bruno-Marek-Allee'
			/>
		</div>
	);
};

export default App;
