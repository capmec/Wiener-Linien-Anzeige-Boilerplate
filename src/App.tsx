import React, { useEffect, useState } from 'react';
import { fetchStopData } from './services/wienerLinienService';
import DepartureDisplay from './components/DepartureDisplay';
import { SkleraService } from './services/skleraService'; // Your SkleraService

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
		// Initialize Sklera SDK
		const initializeSklera = async () => {
			try {
				const { screenData, configData } = await SkleraService.initialize();
				console.log('Screen Data:', screenData);
				console.log('Config Data:', configData);

				// You can also interact with Sklera SDK here
				// Example: log an event when the app initializes
				SkleraService.logEvent('App Initialized', {
					screenData,
					configData,
				});
			} catch (err) {
				console.error('Error initializing Sklera SDK:', err);
			}
		};

		// Fetch tram data
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

		// Call the functions
		initializeSklera();
		fetchData();
	}, []);

	if (error) {
		return <div className='text-red-500 text-center'>{error}</div>;
	}

	return (
		<div className='flex justify-between space-x-8 p-6'>
			<div className='w-1/2'>
				<DepartureDisplay
					departures={stop3445Departures}
					title='Krakauer Straße Abfahrt'
					platform={`Platform: ${stop3445Departures[0]?.vehicle.platform || 'Unknown'}`}
					towards={stop3445Departures[0]?.vehicle.towards || 'Unknown'}
				/>
			</div>
			<div className='w-1/2'>
				<DepartureDisplay
					departures={stop3448Departures}
					title='Krakauer Straße Abfahrt'
					platform={`Platform: ${stop3448Departures[0]?.vehicle.platform || 'Unknown'}`}
					towards={stop3448Departures[0]?.vehicle.towards || 'Unknown'}
				/>
			</div>
		</div>
	);
};

export default App;
