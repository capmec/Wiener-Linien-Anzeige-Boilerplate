// src/services/wienerLinienService.ts
const BASE_URL =
	'https://eogrkqip9l.execute-api.eu-west-1.amazonaws.com/monitor';

// Define types for API response structure
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

type ApiResponse = {
	data?: {
		monitors?: {
			lines?: {
				departures?: {
					departure?: Departure[];
				};
			}[];
		}[];
	};
};

export const fetchStopData = async (stopId: string): Promise<Departure[]> => {
	try {
		const response = await fetch(`${BASE_URL}?stopId=${stopId}`);
		const data: ApiResponse = await response.json();

		// Extract departures with safe chaining
		const departures =
			data?.data?.monitors?.[0]?.lines?.[0]?.departures?.departure || [];

		if (departures.length === 0) {
			console.warn(`No departures found for stopId: ${stopId}`);
		}

		return departures; // Return departures
	} catch (error) {
		console.error(`Error fetching data for stopId ${stopId}:`, error);
		throw new Error(`Failed to fetch departures for stopId: ${stopId}`);
	}
};
