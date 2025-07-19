import { TOrder, TOrdersResponse } from '@/interfaces/order';
import { createApi } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: () => ({ data: {} }),
	endpoints: (build) => ({
		getOrderByNumber: build.query<{ orders: TOrder[] }, string>({
			async queryFn(orderNumber) {
				try {
					const response = await fetch(
						`https://norma.nomoreparties.space/api/orders/${orderNumber}`
					);
					const data = await response.json();
					return { data };
				} catch (error) {
					return { error: error as Error };
				}
			},
		}),

		getAllOrdersWS: build.query<TOrdersResponse, void>({
			query: () => '',

			async onCacheEntryAdded(
				_arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');

				try {
					await cacheDataLoaded;

					ws.onmessage = (event) => {
						const data: TOrdersResponse = JSON.parse(event.data);
						if (data.success) {
							updateCachedData(() => data);
						}
					};

					await cacheEntryRemoved;
					ws.close();
				} catch {
					ws.close();
				}
			},
		}),

		getProfileOrdersWS: build.query<TOrdersResponse, string>({
			query: () => '',

			async onCacheEntryAdded(
				token,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				const ws = new WebSocket(
					`wss://norma.nomoreparties.space/orders?token=${token}`
				);

				try {
					await cacheDataLoaded;

					ws.onmessage = (event) => {
						const data: TOrdersResponse = JSON.parse(event.data);
						if (data.success) {
							updateCachedData(() => data);
						}
					};

					await cacheEntryRemoved;
					ws.close();
				} catch {
					ws.close();
				}
			},
		}),
	}),
});

export const {
	useGetAllOrdersWSQuery,
	useGetProfileOrdersWSQuery,
	useGetOrderByNumberQuery,
} = ordersApi;
