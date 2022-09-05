// empty layout
import {Fragment} from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';

// pages
import Home from '../../pages/Home';
import Menu from '../../pages/Menu';
const publicRoutes = [
	{
		path: '/',
		component: Home,
		layout: DefaultLayout,
	},
	{
		path: '/menu',
		component: Menu,
		layout: DefaultLayout,
	},
	{
		path: '/heart',
		component: Fragment,
		layout: DefaultLayout,
	},
];
const privateRoutes = [];

export {publicRoutes, privateRoutes};
