import { Navigate } from 'react-router-dom';
import React from 'react';

type ResetPasswordRouteProps = {
	children: React.ReactElement;
};

export const ResetPasswordRoute = ({ children }: ResetPasswordRouteProps) => {
	const isResetAllowed = sessionStorage.getItem('resetAllowed') === 'true';

	if (!isResetAllowed) {
		return <Navigate to='/login' replace />;
	}

	return children;
};
