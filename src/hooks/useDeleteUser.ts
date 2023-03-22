import ApiService from '../server/api';

export async function useDeleteInvoice(id: string | number, cb: () => void) {
	try {
		await ApiService.delete(`http://localhost:8000/users/${id}`);
		cb();
	} catch (error) {
		console.error(error);
		throw error;
	}
}
