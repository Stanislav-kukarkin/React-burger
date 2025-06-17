export interface IRegisterRequest {
	email: string;
	password: string;
	name: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IResetPasswordRequest {
	email: string;
}

export interface IResetPasswordConfirmRequest {
	password: string;
	token: string;
}

export interface IUserResponse {
	user: IUserData;
	accessToken: string;
	refreshToken: string;
}

export interface IUserDataResponse {
	success: boolean;
	user: IUserData;
}

export interface IUserData {
	email: string;
	name: string;
}

export interface IRefreshTokenResponse {
	accessToken: string;
	refreshToken: string;
}
