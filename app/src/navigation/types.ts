export type RootTabParamList = {
	Orders: undefined;
	NewOrder: undefined;
	Menu: undefined;
	Report: undefined;
	More: undefined;
};

export type SideTabKey = keyof RootTabParamList;

export type OrdersStackParamList = {
	OrderList: undefined;
	OrderDetail: { orderId: number };
};
