import { GridRowSelectionModel } from '@mui/x-data-grid';
import {
	EOrderType,
	INewOrder,
	IOrder,
	IUpdateOrder,
} from '../interfaces/Orders.interface';

export const getOrders = async (): Promise<IOrder[]> => {
	try {
		const response = await fetch(
			'https://red-candidate-web.azurewebsites.net/api/Orders',
			{
				method: 'GET',
				headers: {
					ApiKey: 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4',
					'Content-Type': 'application/json',
				},
			}
		);
		const jsonData = await response.json();
		return jsonData;
	} catch (err) {
		throw new Error('Failed to fetch orders.');
	}
};

export const addOrder = async (bodyData: INewOrder) => {
	try {
		await fetch(`https://red-candidate-web.azurewebsites.net/api/Orders`, {
			method: 'POST',
			headers: {
				ApiKey: 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyData),
		});
	} catch (err) {
		throw new Error('Failed to add order.');
	}
};

export const updateOrder = async (bodyData: IUpdateOrder) => {
	try {
		await fetch(`https://red-candidate-web.azurewebsites.net/api/Orders`, {
			method: 'PUT',
			headers: {
				ApiKey: 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyData),
		});
	} catch (err) {
		throw new Error('Failed to update order.');
	}
};

export const getOrdersByType = async (
	orderType: EOrderType
): Promise<IOrder[]> => {
	try {
		const response = await fetch(
			`https://red-candidate-web.azurewebsites.net/api/Orders/ByType?orderType=${orderType}`,
			{
				method: 'GET',
				headers: {
					ApiKey: 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4',
					'Content-Type': 'application/json',
				},
			}
		);
		const jsonData = await response.json();
		return jsonData;
	} catch (err) {
		throw new Error('Failed to fetch orders.');
	}
};

export const handleDelete = async (orderIds: GridRowSelectionModel) => {
	try {
		await fetch(
			`https://red-candidate-web.azurewebsites.net/api/Orders/Delete`,
			{
				method: 'POST',
				headers: {
					ApiKey: 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderIds),
			}
		);
	} catch (err) {
		throw new Error('Failed to delete order(s).');
	}
};
