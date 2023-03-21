import { PropsWithChildren } from 'react';
import { Paper, PaperProps } from '@mui/material';

export function ScreenWrapper({
	children,
	...props
}: PropsWithChildren<PaperProps>) {
	return (
		<Paper
			sx={{
				p: '40px',
				w: '100%',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
			}}
			{...props}
		>
			{children}
		</Paper>
	);
}
