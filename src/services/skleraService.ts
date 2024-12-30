// src/services/skleraService.ts
import { skleraSDK } from '@sklera/sdk'; // Assuming the Sklera SDK definition

export class SkleraService {
	// Initialize Sklera SDK and fetch screen/config data
	static async initialize(): Promise<{ screenData: any; configData: any }> {
		try {
			const { screenData, configData } = await skleraSDK.loaded();
			return { screenData, configData };
		} catch (error) {
			console.error('Failed to initialize Sklera SDK:', error);
			throw error;
		}
	}

	// Example: Fetch the application configuration
	static getConfig(): any {
		try {
			return skleraSDK.getConfig();
		} catch (error) {
			console.error('Failed to get config:', error);
			throw error;
		}
	}

	// Example: Log an event with the player
	static logEvent(eventType: string, eventData: any): void {
		try {
			skleraSDK.logEvent(eventType, eventData);
		} catch (error) {
			console.error('Failed to log event:', error);
		}
	}

	// Example: Toggle fullscreen mode
	static toggleFullscreen(): void {
		try {
			skleraSDK.toggleFullscreen();
		} catch (error) {
			console.error('Failed to toggle fullscreen:', error);
		}
	}
}
