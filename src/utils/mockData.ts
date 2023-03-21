export interface Data {
	id: number;
	name: string;
	username: string;
	email: string;
	city: string;
}

export const rows: Data[] = [
	{
		id: 1,
		name: 'John Snow',
		username: 'Wolf',
		email: 'john@snow.com',
		city: 'Winterfell',
	},
	{
		id: 2,
		name: 'Darth Vader',
		username: 'Vader',
		email: 'darth@vader.com',
		city: 'Death Star',
	},
	{
		id: 3,
		name: 'Frodo Baggins',
		username: 'Frodo',
		email: 'frodo@baggins.com',
		city: 'Shire',
	},
	{
		id: 4,
		name: 'Indiana Jones',
		username: 'Indy',
		email: 'indiana@johnes.com',
		city: 'Venice',
	},
];
