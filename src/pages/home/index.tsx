import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScreenWrapper } from '@/Components/ScreenWraper';
import UserTable from '@/Components/Table';
import ApiService from '@/server/api';
import { ReducerType } from '@/server/type';
import { setLoading, setUsers } from '@/utils/store';

export default function HomePage() {
	const dispatch = useDispatch();

	async function fetchInvoices() {
		const { data } = await ApiService.get('http://localhost:8000/users');
		dispatch(setUsers(data));
		dispatch(setLoading(false));
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
