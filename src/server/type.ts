export interface Data {
	id: number;
	name: string;
	username: string;
	email: string;
	city: string;
}

export interface UserState {
	users: Data[];
	loading: boolean;
	open: boolean;
	rowToDelete?: Data;
	order: 'asc' | 'desc';
}

export interface ReducerType {
	userList: UserState;
}
