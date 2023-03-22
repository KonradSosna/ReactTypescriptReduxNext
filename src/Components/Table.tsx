import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { FC, memo, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDeleteInvoice } from '@/hooks/useDeleteUser';
import { Data, ReducerType } from '@/server/type';
import {
	setOpen,
	setRowToDelete,
	setSortingOrder,
	setUsers,
} from '@/utils/store';
import styled from '@emotion/styled';
import { Button, Divider, Grid, Modal, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 400,
	minWidth: 300,
	width: '100%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const StyledTableCell = styled(TableCell)(() => ({
	[`&.${tableCellClasses.head}`]: {
		fontSize: 16,
		fontWeight: 'bold',
	},
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
	id: keyof Data;
	label: string;
	numeric: boolean;
	enableSorting: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: false,
		label: 'Id',
		enableSorting: false,
	},
	{
		id: 'name',
		numeric: false,
		label: 'Name',
		enableSorting: false,
	},
	{
		id: 'username',
		numeric: true,
		label: 'Username',
		enableSorting: true,
	},
	{
		id: 'email',
		numeric: true,
		label: 'Email',
		enableSorting: false,
	},
	{
		id: 'city',
		numeric: true,
		label: 'City',
		enableSorting: false,
	},
];

interface EnhancedTableProps {
	onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow sx={{ bgcolor: '#DCDCDC' }}>
				{headCells.map((headCell) => (
					<StyledTableCell
						key={headCell.id}
						align="center"
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
							disabled={!headCell.enableSorting}
						>
							{headCell.label}
						</TableSortLabel>
					</StyledTableCell>
				))}
				<StyledTableCell align="center">Action</StyledTableCell>
				<StyledTableCell align="center">Action</StyledTableCell>
			</TableRow>
		</TableHead>
	);
}

function EnhancedTableToolbar() {
	const { push } = useRouter();

	return (
		<>
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
				}}
			>
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					User List
				</Typography>
				<Button variant="contained" onClick={() => push(`/add`)}>
					Add
				</Button>
			</Toolbar>
			<Divider />
		</>
	);
}

interface UserTablePropsType {
	rowsData?: Data[];
	loading?: boolean;
}

const UserTable: FC<UserTablePropsType> = ({ rowsData, loading }) => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	const order = useSelector((state: ReducerType) => state.userList.order);
	const orderBy = 'username';

	const open = useSelector((state: ReducerType) => state.userList.open);
	const rowToDelete = useSelector(
		(state: ReducerType) => state.userList.rowToDelete
	);

	const { push } = useRouter();

	const handleOpenDeleteModal = (row: Data) => {
		dispatch(setOpen(true));
		dispatch(setRowToDelete(row));
	};

	const handleCloseDeleteModal = () => dispatch(setOpen(false));
	const handleDelete = (id: number) => {
		useDeleteInvoice(id, () => {
			dispatch(
				setUsers(rowsData?.filter((user: Data) => user.id !== id) as Data[])
			);
		});
		enqueueSnackbar('User deleted successfully', { variant: 'success' });
		handleCloseDeleteModal();
	};

	const handleRequestSort = (
		event: MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc';
		dispatch(setSortingOrder(isAsc ? 'desc' : 'asc'));
	};

	const TableSkeleton = ({
		rows,
		columns,
	}: {
		rows: number;
		columns: number;
	}) => {
		return (
			<>
				{Array.from(Array(columns).keys()).map((key: number) => (
					<TableRow key={key}>
						{Array.from(Array(rows).keys()).map((col: number) => (
							<TableCell key={col} align="center">
								<Skeleton
									key={col}
									animation="wave"
									height={50}
									width={'70%'}
								/>
							</TableCell>
						))}
					</TableRow>
				))}
			</>
		);
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Paper sx={{ width: '100%', mb: 2 }}>
					<EnhancedTableToolbar />
					<TableContainer>
						<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
							<EnhancedTableHead
								order={order}
								orderBy={orderBy}
								onRequestSort={handleRequestSort}
								rowCount={rowsData ? rowsData.length : 0}
							/>
							<TableBody>
								{rowsData && !loading ? (
									rowsData
										.slice()
										.sort(getComparator(order, orderBy))
										.map((row) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={row.id}
												>
													<TableCell align="center">{row.id}</TableCell>
													<TableCell align="center">{row.name}</TableCell>
													<TableCell align="center">{row.username}</TableCell>
													<TableCell align="center">{row.email}</TableCell>
													<TableCell align="center">{row.city}</TableCell>
													<TableCell align="center">
														<Button
															variant="contained"
															sx={{
																bgcolor: (theme) =>
																	theme.palette.secondary.main,
																'&:hover': {
																	backgroundColor: '#a86513',
																},
															}}
															onClick={() => push(`/edit/${row.id}`)}
														>
															Edit
														</Button>
													</TableCell>
													<TableCell align="center">
														<Button
															variant="contained"
															sx={{
																bgcolor: (theme) => theme.palette.error.main,
																'&:hover': {
																	backgroundColor: '#aa1d1d',
																},
															}}
															onClick={() => handleOpenDeleteModal(row)}
														>
															Delete
														</Button>
													</TableCell>
												</TableRow>
											);
										})
								) : (
									<TableSkeleton columns={4} rows={7} />
								)}
								{rowsData && rowsData.length === 0 && !loading && (
									<TableRow>
										<td
											className="MuiTableCell-root MuiTableCell-body"
											colSpan={headCells.length + 2}
											style={{ padding: '8px 0', textAlign: 'center' }}
										>
											{'No Data'}
										</td>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Box>
			{open && (
				<Modal
					open={open}
					onClose={handleCloseDeleteModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Grid container spacing={2} direction="column">
							<Grid item>
								<Typography
									id="modal-modal-title"
									variant="h5"
									component="h2"
									fontWeight="700"
									sx={{ mb: 2 }}
								>
									Delete
								</Typography>
							</Grid>

							<Divider />

							<Grid item>
								<Typography id="modal-modal-description" sx={{ m: 2 }}>
									Do you want to delete{' '}
									<span style={{ fontWeight: 'bold' }}>
										{rowToDelete?.name}
									</span>
									?
								</Typography>
							</Grid>

							<Divider />

							<Grid item width="100%" marginTop="20px">
								<Grid container justifyContent="flex-end">
									<Grid item>
										<Button
											variant="contained"
											sx={{
												bgcolor: 'gray',
												'&:hover': {
													backgroundColor: '#c4bcbc',
													color: '#000000',
												},
											}}
											onClick={handleCloseDeleteModal}
										>
											Cancel
										</Button>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											sx={{
												bgcolor: (theme) => theme.palette.error.main,
												'&:hover': {
													backgroundColor: '#aa1d1d',
												},
											}}
											onClick={() => handleDelete(rowToDelete?.id as number)}
											style={{ marginLeft: '10px' }}
										>
											Delete
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Modal>
			)}
		</>
	);
};

export default memo(UserTable);
