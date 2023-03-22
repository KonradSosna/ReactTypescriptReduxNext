import { ScreenWrapper } from '@/Components/ScreenWraper';
import UserForm from '@/Components/UserForm';
import { Data, ReducerType } from '@/server/type';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { FieldValues, useForm } from 'react-hook-form';
import ApiService from '@/server/api';
import { useSelector } from 'react-redux';

const Add = () => {
	const { push } = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const users = useSelector((state: ReducerType) => state.userList.users);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	async function onSubmit(data: FieldValues) {
		const user: Data = {
			id: users.length + 1,
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
