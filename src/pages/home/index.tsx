import { ScreenWrapper } from '@/Components/ScreenWraper';
import UserTable from '@/Components/Table';
import { Data, rows } from '@/utils/mockData';
import { Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';

export default function HomePage() {
	const [rowsData, setRows] = useState<Data[]>(rows);

	return (
		<ScreenWrapper>
			{rowsData ? (
				<UserTable rowsData={rowsData} setRows={setRows} />
			) : (
				<Stack spacing={1}>
					<Skeleton variant="rounded" width={'100%'} height={60} />
					<Skeleton variant="rounded" width={'100%'} height={60} />
					<Skeleton variant="rounded" width={'100%'} height={60} />
					<Skeleton variant="rounded" width={'100%'} height={60} />
				</Stack>
			)}
		</ScreenWrapper>
	);
}
