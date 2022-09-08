import {clientRoutes, adminRoutes, publicRoutes} from '../../configs/routes';

import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import {memo, useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
const PrivateRoutes = () => {
	if (localStorage.getItem('user') && localStorage.getItem('accessToken'))
		return <Outlet />;
	return <Navigate to="/" />;
};
const Login = () => {
	if (localStorage.getItem('user') === 'admin' && localStorage.getItem('accessToken'))
		return <Navigate to="/admin" />;
	if (localStorage.getItem('user') === 'client' && localStorage.getItem('accessToken'))
		return <Navigate to="/menu" />;
	return <Outlet />;
};
function RenderRoutes() {
	const {user, data} = useSelector(state => state.userReducer);
	const extractRoutes = useCallback(routes => {
		return routes.map((route, index) => {
			const Page = route.page;
			const Layout = route.layout;
			return (
				<Route
					key={index}
					path={route.path}
					element={
						<Layout>
							<Page />
						</Layout>
					}
				/>
			);
		});
	}, []);
	return (
		<Routes>
			{/* {extractRoutes(publicRoutes)} */}
			<Route element={<Login />}>{extractRoutes(publicRoutes)}</Route>
			<Route element={<PrivateRoutes />}>
				{localStorage.getItem('user') === 'admin' &&
					localStorage.getItem('accessToken') &&
					extractRoutes(adminRoutes)}
				{localStorage.getItem('user') === 'client' &&
					localStorage.getItem('accessToken') &&
					extractRoutes(clientRoutes)}
			</Route>
		</Routes>
	);
}
export default memo(RenderRoutes);
