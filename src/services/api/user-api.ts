import {
	IRegisterRequest,
	IUserData,
	IUserDataResponse,
} from '@/interfaces/auth';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/base-query-with-reauth';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getUser: builder.query<IUserDataResponse, void>({
			query: () => 'auth/user',
		}),

		updateUser: builder.mutation<IUserData, Partial<IRegisterRequest>>({
			query: (body) => ({
				url: 'auth/user',
				method: 'PATCH',
				body,
			}),
		}),
	}),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
