// src/App.tsx
import React from 'react';
import { useWienerLinienData } from './hooks/useWienerLinienData';
import DepartureDisplay from './components/DepartureDisplay';

const App: React.FC = () => {
	const stopIds = ['3445', '3448'];
	const { data, error } = useWienerLinienData(stopIds);

	if (error) {
		return (
			<div>
				Es gab ein Problem beim Laden der Daten. Bitte versuchen Sie es später
				erneut.
			</div>
		);
	}

	const departures = data.flatMap((stop: any) =>
		stop.data.monitors.map((monitor: any) => ({
			line: monitor.lines[0].name,
			destination: monitor.lines[0].towards,
			countdown:
				monitor.lines[0].departures.departure[0].departureTime.countdown,
		})),
	);

	return <DepartureDisplay departures={departures} />;
};

export default App;
