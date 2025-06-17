import {
	getAccessToken,
	getRefreshToken,
	setTokens,
} from '@/utils/token-utils';
import {
	IUserResponse,
	IRegisterRequest,
	ILoginRequest,
	IResetPasswordRequest,
	IResetPasswordConfirmRequest,
} from '@/interfaces/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AUTH_BASE_URL = 'https://norma.nomoreparties.space/api/';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: AUTH_BASE_URL,
		prepareHeaders: (headers) => {
			const token = getAccessToken();
			if (token) {
				headers.set('Authorization', token);
			}
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: (builder) => ({
		register: builder.mutation<IUserResponse, IRegisterRequest>({
			query: (body) => ({
				url: 'auth/register',
				method: 'POST',
				body,
			}),
		}),

		login: builder.mutation<IUserResponse, ILoginRequest>({
			query: (body) => ({
				url: 'auth/login',
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					if (data.accessToken && data.refreshToken) {
						setTokens(data.accessToken, data.refreshToken);
					}
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
		}),

		logout: builder.mutation<void, void>({
			query: () => ({
				url: 'auth/logout',
				method: 'POST',
				body: {
					token: getRefreshToken(),
				},
			}),
		}),

		forgotPassword: builder.mutation<void, IResetPasswordRequest>({
			query: (body) => ({
				url: 'password-reset',
				method: 'POST',
				body,
			}),
		}),

		resetPassword: builder.mutation<void, IResetPasswordConfirmRequest>({
			query: (body) => ({
				url: 'password-reset/reset',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
} = authApi;
