/** @type {import('tailwindcss').Config} */
export default {
	content: ['*.html'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				custom: {
					primary: '#c2f796',

					secondary: '#00c997',

					accent: '#71f7e1',

					neutral: '#261e2a',

					'base-100': '#F5F5F7',

					info: '#4888cb',

					success: '#29a387',

					warning: '#c09a11',

					error: '#ec3f3c',
				},
			},
		],
	},
	plugins: [require('daisyui')],
}
