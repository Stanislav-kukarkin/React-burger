import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
	getAccessToken,
	getRefreshToken,
	setTokens,
	clearTokens,
} from './token-utils';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://norma.nomoreparties.space/api/',
	prepareHeaders: (headers) => {
		const token = getAccessToken();
		if (token) {
			headers.set('Authorization', token);
		}
		headers.set('Content-Type', 'application/json');
		return headers;
	},
});

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (
		result.error &&
		(result.error.data as { message: string })?.message === 'jwt expired'
	) {
		const refreshResult = await baseQuery(
			{
				url: 'auth/token',
				method: 'POST',
				body: { token: getRefreshToken() },
			},
			api,
			extraOptions
		);

		if (
			refreshResult.data &&
			(refreshResult.data as { success: boolean }).success
		) {
			const { accessToken, refreshToken } = refreshResult.data as {
				accessToken: string;
				refreshToken: string;
			};
			setTokens(accessToken, refreshToken);
			result = await baseQuery(args, api, extraOptions);
		} else {
			clearTokens();
		}
	}

	return result;
};
