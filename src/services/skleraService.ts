// src/services/skleraService.ts
import { skleraSDK } from '@sklera/sdk'; // Assuming the Sklera SDK definition

// Define the ConfigData type
type ConfigData = {
	stopIds: string[]; // Array of stop IDs
	updateInterval: number; // Update interval (in milliseconds or seconds, depending on your config)
};

export class SkleraService {
	// Initialize Sklera SDK and fetch screen/config data
	static async initialize(): Promise<{
		screenData: any;
		configData: ConfigData;
	}> {
		try {
			const { screenData, configData } = await skleraSDK.loaded(); // Sklera SDK loaded method
			return { screenData, configData }; // Return both screen and config data
		} catch (error) {
			console.error('Failed to initialize Sklera SDK:', error);
			throw error;
		}
	}

	// Example: Fetch the application configuration
	static getConfig(): any {
		try {
			return skleraSDK.getConfig(); // Get the current config
		} catch (error) {
			console.error('Failed to get config:', error);
			throw error;
		}
	}

	// Example: Log an event with the player
	static logEvent(eventType: string, eventData: any): void {
		try {
			skleraSDK.logEvent(eventType, eventData); // Log event with provided type and data
		} catch (error) {
			console.error('Failed to log event:', error);
		}
	}

	// Example: Toggle fullscreen mode
	static toggleFullscreen(): void {
		try {
			skleraSDK.toggleFullscreen(); // Toggle fullscreen mode on/off
		} catch (error) {
			console.error('Failed to toggle fullscreen:', error);
		}
	}
}
