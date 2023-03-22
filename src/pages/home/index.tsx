import { ScreenWrapper } from '@/Components/ScreenWraper';
import UserTable from '@/Components/Table';
import useUsers from '@/hooks/useUsers';

export default function HomePage() {
	const { users, setUsers, loading } = useUsers();

	return (
		<ScreenWrapper>
			<UserTable rowsData={users} loading={loading} setUsers={setUsers} />
		</ScreenWrapper>
	);
}
