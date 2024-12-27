import { useEffect, useState } from 'react';
import { fetchStopData } from '../services/wienerLinienService';

export const useWienerLinienData = (
	stopIds: string[],
	interval: number = 60000,
) => {
	const [data, setData] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const results = await Promise.all(stopIds.map(fetchStopData));
				setData(results);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError(String(err));
				}
			}
		};

		fetchData();
		const timer = setInterval(fetchData, interval);

		return () => clearInterval(timer);
	}, [stopIds, interval]);

	return { data, error };
};
