import { Data, UserState } from '@/server/type';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		users: [],
		loading: true,
		open: false,
		rowToDelete: undefined,
		order: 'asc' as 'asc' | 'desc',
	} as UserState,
	reducers: {
		setUsers: (state: UserState, action: PayloadAction<Data[]>) => {
			state.users = action.payload;
		},

		setLoading: (state: UserState, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},

		setOpen: (state: UserState, action: PayloadAction<boolean>) => {
			state.open = action.payload;
		},

		setRowToDelete: (state: UserState, action: PayloadAction<Data>) => {
			state.rowToDelete = action.payload;
		},

		setSortingOrder: (
			state: UserState,
			action: PayloadAction<'asc' | 'desc'>
		) => {
			state.order = action.payload;
		},
	},
});

export const { setUsers } = userSlice.actions;
export const { setLoading } = userSlice.actions;
export const { setOpen } = userSlice.actions;
export const { setRowToDelete } = userSlice.actions;
export const { setSortingOrder } = userSlice.actions;

export const store = configureStore({
	reducer: {
		userList: userSlice.reducer,
	},
});
