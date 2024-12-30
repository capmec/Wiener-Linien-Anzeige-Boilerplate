//services/skleraService.ts

import { skleraSDK } from '@sklera/sdk'; // Assuming the skleraSDK definition is in a separate file

export class SkleraService {
	/**
	 * Waits for the SDK to be ready and retrieves the screen and configuration data.
	 */
	static async initialize(): Promise<{ screenData: any; configData: any }> {
		try {
			const { screenData, configData } = await skleraSDK.loaded();
			return { screenData, configData };
		} catch (error) {
			console.error('Failed to initialize Sklera SDK:', error);
			throw error;
		}
	}

	/**
	 * Retrieves the application configuration.
	 */
	static getConfig(): any {
		try {
			return skleraSDK.getConfig();
		} catch (error) {
			console.error('Failed to get config:', error);
			throw error;
		}
	}

	/**
	 * Stores text data on the player.
	 */
	static writeData(key: string, data: any): void {
		try {
			skleraSDK.writeData(key, data);
		} catch (error) {
			console.error(`Failed to write data for key: ${key}`, error);
		}
	}

	/**
	 * Reads text data from the player.
	 */
	static readData(key: string): string {
		try {
			return skleraSDK.readData(key);
		} catch (error) {
			console.error(`Failed to read data for key: ${key}`, error);
			throw error;
		}
	}

	/**
	 * Toggles the fullscreen mode of the app widget.
	 */
	static toggleFullscreen(): void {
		try {
			skleraSDK.toggleFullscreen();
		} catch (error) {
			console.error('Failed to toggle fullscreen:', error);
		}
	}

	/**
	 * Fetches items from the Sklera library.
	 */
	static async getItems(): Promise<any> {
		try {
			return await skleraSDK.getItems();
		} catch (error) {
			console.error('Failed to fetch items:', error);
			throw error;
		}
	}

	/**
	 * Fetches widgets by their name.
	 */
	static async getWidgetsByName(name: string): Promise<any> {
		try {
			return await skleraSDK.getWidgetsByName(name);
		} catch (error) {
			console.error(`Failed to fetch widgets with name: ${name}`, error);
			throw error;
		}
	}

	/**
	 * Sets the order position of the app widget.
	 */
	static setAppWidgetOrder(
		orderPosition: 'foreground' | 'background' | 'default' = 'default',
	): void {
		try {
			skleraSDK.setAppWidgetOrder(orderPosition);
		} catch (error) {
			console.error('Failed to set widget order:', error);
		}
	}

	/**
	 * Logs an event with the player.
	 */
	static logEvent(eventType: string, eventData: any): void {
		try {
			skleraSDK.logEvent(eventType, eventData);
		} catch (error) {
			console.error('Failed to log event:', error);
		}
	}
}
