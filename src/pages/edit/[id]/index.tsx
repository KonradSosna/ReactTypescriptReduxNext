import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ScreenWrapper } from '@/Components/ScreenWraper';
import UserForm from '@/Components/UserForm';
import ApiService from '@/server/api';
import { Data, ReducerType } from '@/server/type';
import { CircularProgress } from '@mui/material';

const Edit = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { query, push } = useRouter();
	const users = useSelector((state: ReducerType) => state.userList.users);

	const rowToEdit = useMemo(
		() => users.filter((user: Data) => user.id === Number(query.id))[0],
		[query.id, users]
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	async function onSubmit(data: FieldValues) {
		const user: Data = {
			id: Number(query.id),
			name: data.name,
			username: data.username,
			city: data.city,
			email: data.email,
		};

		try {
			await ApiService.patch(`http://localhost:8000/users/${query.id}`, user);
			enqueueSnackbar('User edited successfully', { variant: 'success' });
			push(`/`);
		} catch (error) {
			enqueueSnackbar('Something went worng', { variant: 'error' });
			reset();
		}
	}

	return (
		<ScreenWrapper>
			{rowToEdit ? (
				<UserForm
					onSubmit={handleSubmit(onSubmit)}
					register={register}
					errors={errors}
					rowToEdit={rowToEdit}
				/>
			) : (
				<CircularProgress />
			)}
		</ScreenWrapper>
	);
};

export default Edit;
