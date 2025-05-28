import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TIngredient } from '@/utils/types';
import { TOrderRequest, TOrderResponse } from '../interfaces/api-interface';

export const ingredientsApi = createApi({
	reducerPath: 'ingredientsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://norma.nomoreparties.space/api/',
	}),
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
