import { Navigate } from 'react-router-dom';
import { Preloader } from '../ui/preloader/preloader';
import { getAccessToken } from '@/utils/token-utils';
import { useEffect, useState } from 'react';

type ProtectedRouteProps = {
	children: React.ReactElement;
};

export const UnAuthProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const [isInit, setIsInit] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = getAccessToken();
		setIsAuthenticated(Boolean(token));
		setIsInit(true);
	}, []);

	switch (true) {
		case !isInit:
			return <Preloader />;

		case Boolean(isAuthenticated):
			return <Navigate replace to={{ pathname: '/' }} />;

		default:
			return children;
	}
};
