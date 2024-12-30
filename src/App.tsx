import React, { useEffect, useReducer } from 'react';
import { fetchStopData } from './services/wienerLinienService';
import DepartureDisplay from './components/DepartureDisplay';

type State = {
	departuresBrunoMarekAllee: any[];
	departuresRaxstrasse: any[];
	error: string | null;
	loading: boolean;
};

type Action =
	| { type: 'FETCH_START' }
	| {
			type: 'FETCH_SUCCESS';
			departuresBrunoMarekAllee: any[];
			departuresRaxstrasse: any[];
	  }
	| { type: 'FETCH_ERROR'; error: string };

const initialState: State = {
	departuresBrunoMarekAllee: [],
	departuresRaxstrasse: [],
	error: null,
	loading: true,
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'FETCH_START':
			return { ...state, loading: true, error: null };
		case 'FETCH_SUCCESS':
			return {
				...state,
				departuresBrunoMarekAllee: action.departuresBrunoMarekAllee,
				departuresRaxstrasse: action.departuresRaxstrasse,
				loading: false,
			};
		case 'FETCH_ERROR':
			return { ...state, error: action.error, loading: false };
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const getData = async () => {
			dispatch({ type: 'FETCH_START' });

			try {
				const stopIdBrunoMarekAllee = '3445'; // Replace with actual stop ID
				const stopIdRaxstrasse = '1234'; // Replace with actual stop ID
				const departuresBrunoMarekAllee = await fetchStopData(
					stopIdBrunoMarekAllee,
				);
				const departuresRaxstrasse = await fetchStopData(stopIdRaxstrasse);

				dispatch({
					type: 'FETCH_SUCCESS',
					departuresBrunoMarekAllee,
					departuresRaxstrasse,
				});
			} catch (error) {
				dispatch({ type: 'FETCH_ERROR', error: 'Error fetching data' });
			}
		};

		getData();
	}, []);

	if (state.loading) {
		return <div className='text-center text-xl font-semibold'>Loading...</div>;
	}

	if (state.error) {
		return (
			<div className='text-center text-xl text-red-500'>
				Error: {state.error}
			</div>
		);
	}

	const nextDeparturesBrunoMarekAllee = state.departuresBrunoMarekAllee.slice(
		0,
		3,
	);
	const nextDeparturesRaxstrasse = state.departuresRaxstrasse.slice(0, 3);

	return (
		<div className='container mx-auto p-4'>
			<div className='flex justify-between space-x-4'>
				{/* Display for Bruno-Marek-Allee */}
				<div className='w-full bg-gray-100 p-4 rounded-lg shadow-md'>
					{nextDeparturesBrunoMarekAllee.length > 0 ? (
						<DepartureDisplay departures={nextDeparturesBrunoMarekAllee} />
					) : (
						<div className='text-center text-gray-500'>
							No departures available
						</div>
					)}
				</div>

				<div className='w-full bg-gray-100 p-4 rounded-lg shadow-md'>
					{nextDeparturesRaxstrasse.length > 0 ? (
						<DepartureDisplay departures={nextDeparturesRaxstrasse} />
					) : (
						<div className='text-center text-gray-500'>
							No departures available
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
