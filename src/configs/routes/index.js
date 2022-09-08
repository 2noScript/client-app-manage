// empty layout
import {Fragment} from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';

// pages
import Home from '../../pages/Home';
import Menu from '../../pages/Menu';
import Login from '../../pages/Login';
import Admin from '../../pages/Admin';
const publicRoutes = [
	{
		path: '/',
		page: Login,
		layout: Fragment,
	},
];
const clientRoutes = [
	{
		path: '/home',
		page: Home,
		layout: DefaultLayout,
	},
	{
		path: '/menu',
		page: Menu,
		layout: DefaultLayout,
	},
	{
		path: '/heart',
		page: Fragment,
		layout: DefaultLayout,
	},
];
const adminRoutes = [
	{
		path: '/admin',
		page: Admin,
		layout: Fragment,
	},
];

export {clientRoutes, adminRoutes, publicRoutes};
