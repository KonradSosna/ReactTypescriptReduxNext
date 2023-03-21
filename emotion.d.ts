import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		palette: {
			error: { main: string };
			primary: { main: string };
			secondary: { main: string };
			common: {
				black: string;
				white: string;
			};
		};
	}
}
