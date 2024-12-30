import React, { useEffect, useState } from 'react';
import { skleraSDK } from '@sklera/sdk';
import { fetchStopData } from './services/wienerLinienService';
import DepartureDisplay from './components/DepartureDisplay';

const App: React.FC = () => {
	const [departures, setDepartures] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Initialize Sklera SDK
		const initializeSklera = async () => {
			try {
				const { screenData, configData } = await skleraSDK.loaded();
				console.log('Screen Data:', screenData);
				console.log('Config Data:', configData);
			} catch (error) {
				console.error('Failed to initialize Sklera SDK:', error);
			}
		};
		initializeSklera();

		// Fetch departure data
		const fetchDepartureData = async () => {
			try {
				const stopIds = ['3445', '3448'];
				const results = await Promise.all(stopIds.map(fetchStopData));
				const departures = results.flatMap((stop: any) =>
					stop.data.monitors.map((monitor: any) => ({
						line: monitor.lines[0].name,
						destination: monitor.lines[0].towards,
						countdown:
							monitor.lines[0].departures.departure[0].departureTime.countdown,
					})),
				);
				setDepartures(departures);
			} catch (err) {
				setError('Failed to load departure data.');
				console.error(err);
			}
		};

		fetchDepartureData();
		const timer = setInterval(fetchDepartureData, 60000); // Fetch every minute

		return () => clearInterval(timer); // Cleanup on unmount
	}, []);

	if (error) {
		return <div>{error}</div>;
	}

	return <DepartureDisplay departures={departures} />;
};

export default App;
