import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import createEmotionCache from '@/utils/createEmotionCache';
import { store } from '@/utils/store';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '../utils/theme';

import type { AppProps } from 'next/app';
const clientSideEmotionCache = createEmotionCache();

export default function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}: AppProps & { emotionCache?: EmotionCache }) {
	return (
		<Provider store={store}>
			<CacheProvider value={emotionCache}>
				<ThemeProvider theme={theme}>
					<SnackbarProvider maxSnack={3}>
						<CssBaseline />
						<Component {...pageProps} />
					</SnackbarProvider>
				</ThemeProvider>
			</CacheProvider>
		</Provider>
	);
}
