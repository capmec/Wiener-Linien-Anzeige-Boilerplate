import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { resolve } from 'path';
import { copyFileSync, existsSync } from 'fs';

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'copy-manifest',
			writeBundle() {
				const sourcePath = resolve(__dirname, 'manifest.json');
				const destPath = resolve(__dirname, 'dist/manifest.json');
				if (existsSync(sourcePath)) {
					copyFileSync(sourcePath, destPath);
					console.log('manifest.json copied to dist folder.');
				} else {
					console.error('manifest.json not found. Skipping copy step.');
				}
			},
		},
	],
	base: '/wiener-linien-anzeige-boilerplate/',
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
});
