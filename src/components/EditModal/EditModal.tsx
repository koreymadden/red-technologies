import {
	Button,
	Modal,
	Box,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import {
	EOrderType,
	IOrder,
	IUpdateOrder,
} from '../../interfaces/Orders.interface';
import { useEffect, useState } from 'react';
import { Upload } from '@mui/icons-material';

interface ChildComponentProps {
	open: boolean;
	loading: boolean;
	data: IOrder;
	handleClose: () => void;
	handleUpdateOrder: (data: IUpdateOrder) => void;
}

export const EditModal: React.FC<ChildComponentProps> = (props) => {
	const { open, handleClose, loading, handleUpdateOrder, data } = props;
	const [filter, setFilter] = useState('');
	const [customer, setCustomer] = useState('');
	const [agent, setAgent] = useState('');
	const [orderId, setOrderId] = useState('');

	// Update values when the data is changed
	useEffect(() => {
		setAgent(data.createdByUserName);
		setFilter(data.orderType);
		setCustomer(data.customerName);
		setOrderId(data.orderId);
	}, [data]);

	// Update filter variable when filter is changed.
	const handleFilterChange = (event: SelectChangeEvent) => {
		const orderType = event.target.value;
		setFilter(orderType);
	};

	// Update filter variable when customer name is changed.
	const handleCustomerChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const customerName = event.target.value;
		setCustomer(customerName);
	};

	// Update filter variable when agent name is changed.
	const handleAgentChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const agentName = event.target.value;
		setAgent(agentName);
	};

	// Send data from fields to function that calls the API and resets the form fields.
	const submitUpdatedOrder = (
		agentName: string,
		customerName: string,
		orderType: string,
		orderId: string
	) => {
		handleUpdateOrder({
			createdByUserName: agentName,
			customerName: customerName,
			orderType: orderType,
			orderId: orderId,
		});
		clearFormData();
	};

	// Clears out the fields and data that contains any form information.
	const clearFormData = () => {
		setCustomer('');
		setAgent('');
		setFilter('');
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box
				sx={{
					position: 'absolute' as 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					boxSizing: 'border-box',
					width: '100%',
					maxWidth: 550,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography id='modal-modal-title-2' variant='h6' component='h2'>
					Edit Order
				</Typography>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete='off'
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							gap: '20px',
							margin: '15px 0',
						}}
					>
						<TextField
							label='Customer'
							style={{ margin: '0', width: '100%' }}
							value={customer}
							onChange={(e) => handleCustomerChange(e)}
						/>
						<FormControl sx={{ m: 0, minWidth: 150 }} size='small'>
							<InputLabel
								id='demo-select-small-3'
								style={{ lineHeight: '32px' }}
							>
								Order Type
							</InputLabel>
							<Select
								labelId='demo-select-small-4'
								id='demo-select-small-4'
								value={filter}
								label='Order Type'
								onChange={(e) => handleFilterChange(e)}
								style={{ height: '50px' }}
							>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								<MenuItem value={EOrderType.Standard}>Standard</MenuItem>
								<MenuItem value={EOrderType.SaleOrder}>Sale</MenuItem>
								<MenuItem value={EOrderType.PurchaseOrder}>Purchase</MenuItem>
								<MenuItem value={EOrderType.TransferOrder}>Transfer</MenuItem>
								<MenuItem value={EOrderType.ReturnOrder}>Return</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label='Agent'
							style={{ margin: '0', width: '100%' }}
							value={agent}
							onChange={(e) => handleAgentChange(e)}
						/>
						<Button
							variant='contained'
							endIcon={<Upload />}
							color='primary'
							disabled={loading || !agent || !customer || !filter}
							sx={{ height: '50px', marginTop: '10px' }}
							onClick={() =>
								submitUpdatedOrder(agent, customer, filter, orderId)
							}
						>
							Update Order
						</Button>
					</div>
				</Box>
			</Box>
		</Modal>
	);
};
