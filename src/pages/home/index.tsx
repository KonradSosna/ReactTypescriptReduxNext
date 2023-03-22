import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScreenWrapper } from '@/Components/ScreenWraper';
import UserTable from '@/Components/Table';
import ApiService from '@/server/api';
import { ReducerType } from '@/server/type';
import { setLoading, setUsers } from '@/utils/store';
import { useSnackbar } from 'notistack';

export default function HomePage() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	async function fetchInvoices() {
		await ApiService.get('http://localhost:8000/users')
			.then((res) => {
				dispatch(setUsers(res.data));
				dispatch(setLoading(false));
			})
			.catch(() =>
				enqueueSnackbar('Something went worng', { variant: 'error' })
			);
	}

	useEffect(() => {
		fetchInvoices();
	}, []);

	const users = useSelector((state: ReducerType) => state.userList.users);
	const loading = useSelector((state: ReducerType) => state.userList.loading);

	return (
		<ScreenWrapper>
			<UserTable rowsData={users} loading={loading} />
		</ScreenWrapper>
	);
}
