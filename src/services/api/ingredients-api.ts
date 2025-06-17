import { createApi } from '@reduxjs/toolkit/query/react';
import {
	TIngredient,
	TOrderRequest,
	TOrderResponse,
} from '@/interfaces/ingredients';
import { baseQueryWithReauth } from '@/utils/base-query-with-reauth';

export const ingredientsApi = createApi({
	reducerPath: 'ingredientsApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getIngredients: builder.query<TIngredient[], void>({
			query: () => 'ingredients',
			transformResponse: (response: { data: TIngredient[] }) => {
				return response.data;
			},
		}),

		createOrder: builder.mutation<TOrderResponse, TOrderRequest>({
			query: (body) => ({
				url: 'orders',
				method: 'POST',
				body,
				headers: {
					'Content-Type': 'application/json',
				},
			}),
		}),
	}),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } =
	ingredientsApi;
