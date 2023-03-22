import { Data } from '@/server/type';
import styled from '@emotion/styled';
import {
	Button,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent, FC, memo } from 'react';
import {
	FieldError,
	FieldErrors,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form';

const ErrorField = styled(Typography)(
	({ theme }) => `
	color: ${theme.palette.error.main};
	margin-bottom: -24px;
`
);

interface UserFormPropsType {
	onSubmit: (e?: BaseSyntheticEvent<object> | undefined) => Promise<void>;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	rowToEdit?: Data;
}

const UserForm: FC<UserFormPropsType> = ({
	onSubmit,
	errors,
	register,
	rowToEdit,
}) => {
	const { push } = useRouter();

	const ErrorMsg = (field?: FieldError) => {
		return (
			<>
				{field?.type === 'required' ? (
					<ErrorField>This field is required</ErrorField>
				) : field?.type === 'pattern' && field.ref?.name !== 'email' ? (
					<ErrorField>{'Field can only contain letters'}</ErrorField>
				) : field?.type === 'pattern' && field.ref?.name === 'email' ? (
					<ErrorField>{'Wrong email format'}</ErrorField>
				) : null}
			</>
		);
	};

	return (
		<Paper
			sx={{
				width: '450px',
				minHeight: '550px',
				maxHeight: '650px',
			}}
		>
			<Grid container direction="column">
				<Grid item padding="0 30px">
					{<h1>{rowToEdit ? 'Edit Form' : 'Add Form'}</h1>}
				</Grid>
				<Divider />
				<Grid item>
					<form onSubmit={onSubmit}>
						<Grid
							container
							direction="column"
							justifyContent="center"
							alignItems="center"
							rowGap={6}
							sx={{
								margin: '20px 0',
							}}
						>
							<Grid item>
								<TextField
									{...register('name', {
										required: true,
										pattern: /^[a-zA-Z ]+$/i,
										maxLength: 20,
									})}
									error={errors.name ? true : false}
									id="outlined-error"
									label="Name"
									defaultValue={rowToEdit?.name}
								/>
								{ErrorMsg(errors.name as FieldError)}
							</Grid>

							<Grid item>
								<TextField
									{...register('username', {
										required: true,
										pattern: /^[A-Za-z]+$/i,
										maxLength: 20,
									})}
									error={errors.username ? true : false}
									id="outlined-error"
									label="Username"
									defaultValue={rowToEdit?.username}
								/>
								{ErrorMsg(errors.username as FieldError)}
							</Grid>

							<Grid item>
								<TextField
									{...register('email', {
										required: true,
										pattern: /\S+@\S+\.\S+/i,
										maxLength: 20,
									})}
									error={errors.email ? true : false}
									id="outlined-error"
									label="Email"
									defaultValue={rowToEdit?.email}
								/>
								{ErrorMsg(errors.email as FieldError)}
							</Grid>

							<Grid item>
								<TextField
									{...register('city', {
										required: true,
										pattern: /^[a-zA-Z ]+$/i,
										maxLength: 20,
									})}
									error={errors.city ? true : false}
									id="outlined-error"
									label="City"
									defaultValue={rowToEdit?.city}
								/>
								{ErrorMsg(errors.city as FieldError)}
							</Grid>

							<Grid
								item
								marginTop="20px"
								display="flex"
								flexWrap="wrap"
								justifyContent="center"
								rowGap={2}
							>
								<Button
									variant="outlined"
									color="error"
									onClick={() => push(`/`)}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									color="success"
									type="submit"
									style={{ marginLeft: '10px' }}
									disabled={Object.keys(errors).length > 0}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default memo(UserForm);
