import { ScreenWrapper } from '@/Components/ScreenWraper';
import UserForm from '@/Components/UserForm';
import useUsers from '@/hooks/useUsers';
import { Data } from '@/server/type';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { FieldValues, useForm } from 'react-hook-form';
import ApiService from '@/server/api';

const Add = () => {
	const { push } = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const { usersCount } = useUsers();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	async function onSubmit(data: FieldValues) {
		const user: Data = {
			id: usersCount + 1,
			name: data.name,
			username: data.username,
			city: data.city,
			email: data.email,
		};

		try {
			await ApiService.post('http://localhost:8000/users', user);
			enqueueSnackbar('User added successfully', { variant: 'success' });
			push(`/`);
		} catch (error) {
			enqueueSnackbar('Something went worng', { variant: 'error' });
			reset();
		}
	}

	return (
		<ScreenWrapper>
			<UserForm
				onSubmit={handleSubmit(onSubmit)}
				register={register}
				errors={errors}
			/>
		</ScreenWrapper>
	);
};

export default Add;
