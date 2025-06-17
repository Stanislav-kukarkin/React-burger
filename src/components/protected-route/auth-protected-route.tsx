import { Navigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '@/utils/token-utils';
import { useState, useEffect } from 'react';
import { Preloader } from '../ui/preloader/preloader';

type ProtectedRouteProps = {
	children: React.ReactElement;
};

export const AuthProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const [isInit, setIsInit] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const location = useLocation();

	useEffect(() => {
		const token = getAccessToken();
		setIsAuthenticated(Boolean(token));
		setIsInit(true);
	}, []);

	switch (true) {
		case !isInit:
			return <Preloader />;

		case !isAuthenticated:
			return <Navigate replace to='/login' state={{ from: location }} />;

		default:
			return children;
	}
};
