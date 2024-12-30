//vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/wiener-linien-anzeige-boilerplate/',
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
});
