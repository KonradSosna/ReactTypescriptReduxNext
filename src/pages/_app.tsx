import createEmotionCache from '@/utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { theme } from '../utils/theme';

const clientSideEmotionCache = createEmotionCache();

export default function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}: AppProps & { emotionCache?: EmotionCache }) {
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider maxSnack={3}>
					<CssBaseline />
					<Component {...pageProps} />
				</SnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
