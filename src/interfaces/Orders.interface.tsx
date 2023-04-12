export interface IOrder {
	createdByUserName: string;
	createdDate: string;
	customerName: string;
	orderId: string;
	orderType: string;
}

export interface INewOrder {
	orderType: string;
	customerName: string;
	createdByUserName: string;
}

export interface IUpdateOrder {
	orderId: string;
	orderType: string;
	customerName: string;
	createdByUserName: string;
}

export enum EOrderType {
	Standard = 'Standard',
	SaleOrder = 'SaleOrder',
	PurchaseOrder = 'PurchaseOrder',
	TransferOrder = 'TransferOrder',
	ReturnOrder = 'ReturnOrder',
}
