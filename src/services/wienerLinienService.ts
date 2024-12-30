// src/services/wienerLinienService.ts
const BASE_URL =
	'https://eogrkqip9l.execute-api.eu-west-1.amazonaws.com/monitor';

export const fetchStopData = async (stopId: string) => {
	try {
		const response = await fetch(`${BASE_URL}?stopId=${stopId}`);
		const data = await response.json();

		// Check if departures are available and extract them
		const departures =
			data?.data?.monitors?.[0]?.lines?.[0]?.departures?.departure || [];

		if (departures.length === 0) {
			console.log('No departures found for stopId:', stopId);
		} else {
			console.log('Departures:', departures);
		}

		return departures; // Return departures directly
	} catch (error) {
		console.error(`Error fetching data for stopId ${stopId}:`, error);
		throw error;
	}
};
