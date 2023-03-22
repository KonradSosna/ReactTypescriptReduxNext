import { Data } from '@/server/type';
import { useEffect, useState } from 'react';
import ApiService from '../server/api';

export default function useUsers() {
	const [users, setUsers] = useState<Data[]>([]);
	const [loading, setLoading] = useState(true);

	async function fetchInvoices() {
		const { data } = await ApiService.get('http://localhost:8000/users');
		setUsers(data);
	}

	const usersCount = users.length;

	useEffect(() => {
		fetchInvoices();
		setLoading(false);
	}, []);

	return { users, setUsers, loading, usersCount };
}
