import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowSelectionModel,
} from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {
	EOrderType,
	INewOrder,
	IOrder,
	IUpdateOrder,
} from '../../interfaces/Orders.interface';
import {
	handleDelete,
	getOrders,
	getOrdersByType,
	addOrder,
	updateOrder,
} from '../../services/Orders.services';
import {
	Autocomplete,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { Delete, Add, EditNote, Refresh } from '@mui/icons-material';
import { PostModal } from '../PostModal/PostModal';
import { EditModal } from '../EditModal/EditModal';

function Orders() {
	const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>([]);
	const [data, setData] = useState<IOrder[]>([]);
	const [dataToModify, setDataToModify] = useState<IOrder>({
		createdByUserName: '',
		createdDate: '',
		customerName: '',
		orderId: '',
		orderType: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [filter, setFilter] = useState('');
	const [search, setSearch] = useState('');
	const [open, setOpen] = useState(false);
	const [openEditor, setOpenEditor] = useState(false);

	// Fetch orders when the page loads.
	useEffect(() => {
		handleOrders();
	}, []);

	// Fetch all orders.
	const handleOrders = () => {
		setLoading(true);
		getOrders()
			.then((jsonData) => {
				setData(jsonData.reverse());
				setFilter('');
				setSearch('');
				setSelectedIds([]);
				handleCloseEditor();
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setFilter('');
				setSearch('');
				setSelectedIds([]);
				handleCloseEditor();
				setLoading(false);
			});
	};

	// Fetch orders by their type.
	const handleOrdersByType = (orderType: EOrderType) => {
		setLoading(true);
		getOrdersByType(orderType)
			.then((jsonData) => {
				setData(jsonData);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	};

	// Add a new order.
	const handleNewOrder = async (orderData: INewOrder) => {
		setLoading(true);
		await addOrder(orderData);
		handleOrders();
	};

	// Update an existing order.
	const handleUpdateOrder = async (orderData: IUpdateOrder) => {
		setLoading(true);
		await updateOrder(orderData);
		handleOrders();
	};

	// Delete orders with the given orderIds.
	const handleDeleteOrder = async (orderIds: GridRowSelectionModel) => {
		try {
			setLoading(true);
			await handleDelete(orderIds);
			handleOrders();
		} catch (err: any) {
			setError(err?.message);
			setSelectedIds([]);
			setLoading(false);
		}
	};

	// Headers, fields, and field size data.
	const columns: GridColDef[] = [
		{ field: 'orderId', headerName: 'Order ID', width: 300 },
		{ field: 'createdDate', headerName: 'Creation Date', width: 180 },
		{ field: 'createdByUserName', headerName: 'Created By', width: 150 },
		{ field: 'orderType', headerName: 'Order Type', width: 130 },
		{ field: 'customerName', headerName: 'Customer', width: 150 },
		{
			field: 'edit',
			headerName: '',
			width: 50,
			renderCell: (params) => (
				<EditNote
					style={{ color: '#444444' }}
					className='edit-icon'
					onClick={(e) => editOrder(e, params)}
				/>
			),
		},
	];

	// Bring up the edit order modal.
	const editOrder = (
		e: React.MouseEvent<SVGSVGElement, MouseEvent>,
		params: GridRenderCellParams
	) => {
		e.stopPropagation();
		const existingData: IOrder = {
			createdByUserName: params.row.createdByUserName,
			createdDate: params.row.createdDate,
			customerName: params.row.customerName,
			orderId: params.row.orderId,
			orderType: params.row.orderType,
		};
		setDataToModify(existingData);
		handleOpenEditor();
	};

	// Update table results when the Order Type filter is applied.
	const handleFilterChange = (event: SelectChangeEvent) => {
		const orderType = event.target.value;
		setFilter(orderType);
		if (orderType) {
			handleOrdersByType(event.target.value as EOrderType);
		} else {
			handleOrders();
		}
	};

	// Set the variable to show the post modal.
	const handleOpen = () => setOpen(true);

	// Set the variable to close the post modal.
	const handleClose = () => setOpen(false);

	// Set the variable to show the edit modal.
	const handleOpenEditor = () => setOpenEditor(true);

	// Set the variable to close the edit modal.
	const handleCloseEditor = () => setOpenEditor(false);

	// Dispaly error messages where the 'No rows' text would normally appear
	const NoRowsComponent = () => {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<Typography>{error ? error : 'No Rows'}</Typography>
			</div>
		);
	};

	return (
		<div className='Orders'>
			<PostModal
				open={open}
				handleClose={handleClose}
				loading={loading}
				handleNewOrder={handleNewOrder}
			/>
			<EditModal
				open={openEditor}
				handleClose={handleCloseEditor}
				loading={loading}
				handleUpdateOrder={handleUpdateOrder}
				data={dataToModify}
			/>
			<div
				className='action-bar'
				style={{
					margin: '20px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					gap: '20px',
				}}
			>
				<div
					style={{
						display: 'flex',
						gap: '20px',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					<IconButton onClick={handleOrders}>
						<Refresh />
					</IconButton>
					<Button
						variant='contained'
						endIcon={<Delete />}
						color='primary'
						disabled={loading || !selectedIds.length}
						sx={{ height: '40px' }}
						onClick={() => handleDeleteOrder(selectedIds)}
					>
						Delete Selected
					</Button>
					<Button
						variant='contained'
						endIcon={<Add />}
						color='secondary'
						disabled={loading}
						sx={{ height: '40px' }}
						onClick={handleOpen}
					>
						Create Order
					</Button>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
					<FormControl sx={{ m: 0, minWidth: 150 }} size='small'>
						<InputLabel id='demo-select-small'>Order Type</InputLabel>
						<Select
							labelId='demo-select-small'
							id='demo-select-small'
							value={filter}
							label='Order Type'
							onChange={handleFilterChange}
						>
							<MenuItem value=''>
								<em>Any</em>
							</MenuItem>
							<MenuItem value={EOrderType.Standard}>Standard</MenuItem>
							<MenuItem value={EOrderType.SaleOrder}>Sale</MenuItem>
							<MenuItem value={EOrderType.PurchaseOrder}>Purchase</MenuItem>
							<MenuItem value={EOrderType.TransferOrder}>Transfer</MenuItem>
							<MenuItem value={EOrderType.ReturnOrder}>Return</MenuItem>
						</Select>
					</FormControl>
					<div style={{ minWidth: '250px' }}>
						<Autocomplete
							size='small'
							freeSolo
							disableClearable
							options={data.map((value) => value.orderId)}
							renderInput={(params) => (
								<TextField
									onChange={(e) => setSearch(e.target.value)}
									onSelect={(e: any) => setSearch(e.target.value)}
									{...params}
									label='Search'
									InputProps={{
										...params.InputProps,
										type: 'search',
									}}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div style={{ height: 631, width: '100%' }}>
				{loading ? (
					<Stack
						sx={{
							color: '#DB3534',
							display: 'flex',
							justifyContent: 'center',
							marginTop: '30px',
						}}
						direction='row'
					>
						<CircularProgress color='inherit' />
					</Stack>
				) : (
					<DataGrid
						getRowId={(row) => row.orderId}
						getRowClassName={(params) =>
							params.indexRelativeToCurrentPage % 2 === 0
								? 'Mui-even'
								: 'Mui-odd'
						}
						rows={(data || []).filter(
							(row) => row.orderId.indexOf(search) > -1
						)}
						columns={columns}
						onRowSelectionModelChange={(ids) => {
							setSelectedIds(ids);
						}}
						slots={{
							noRowsOverlay: NoRowsComponent,
						}}
						autoPageSize
						checkboxSelection
					/>
				)}
			</div>
		</div>
	);
}

export default Orders;
