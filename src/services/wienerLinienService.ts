// src/services/wienerLinienService.ts
const BASE_URL =
	'https://eogrkqip9l.execute-api.eu-west-1.amazonaws.com/monitor';

export const fetchStopData = async (stopId: string) => {
	try {
		const url = `${BASE_URL}?stopId=${stopId}`;
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error(`Error fetching data for stopId ${stopId}:`, error);
		throw error;
	}
};
