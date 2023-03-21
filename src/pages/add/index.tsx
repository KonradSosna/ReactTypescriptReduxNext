import { ScreenWrapper } from '@/Components/ScreenWraper';
import UserForm from '@/Components/UserForm';
import { useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const Add = () => {
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
			/>
		</ScreenWrapper>
	);
};

export default Add;
