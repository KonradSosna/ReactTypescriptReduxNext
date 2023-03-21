import UserForm from '@/Components/UserForm';
import { useCallback, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { rows } from '@/utils/mockData';
import { ScreenWrapper } from '@/Components/ScreenWraper';

const Edit = () => {
	const { query } = useRouter();
	const rowToEdit = useMemo(
		() => rows.filter((row) => row.id === Number(query.id))[0],
		[query.id]
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = useCallback(
		() => (data: FieldValues) => console.warn(data),
		[]
	);

	return (
		<ScreenWrapper>
			<UserForm
				onSubmit={handleSubmit(onSubmit)}
				register={register}
				errors={errors}
				rowToEdit={rowToEdit}
			/>
		</ScreenWrapper>
	);
};

export default Edit;
