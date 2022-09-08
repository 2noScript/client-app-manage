// empty layout
import {Fragment} from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import Adminlayout from '../../layouts/AdminLayout';
// pages
import Home from '../../pages/Home';
import Menu from '../../pages/Menu';
import Login from '../../pages/Login';

import BillManage from '../../pages/Admin/BillManage';
import ProductsManage from '../../pages/Admin/ProductsManage';
import StaffManage from '../../pages/Admin/StaffManage';
import TableManage from '../../pages/Admin/TableManage';
import UserManage from '../../pages/Admin/UserManage';

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
		layout: Adminlayout,
	},
	{
		path: '/admin/products',
		page: ProductsManage,
		layout: Adminlayout,
	},

	{
		path: '/admin/bill',
		page: BillManage,
		layout: Adminlayout,
	},
	{
		path: '/admin/staff',
		page: StaffManage,
		layout: Adminlayout,
	},
	{
		path: '/admin/table',
		page: TableManage,
		layout: Adminlayout,
	},
	{
		path: '/admin/user',
		page: UserManage,
		layout: Adminlayout,
	},
];

export {clientRoutes, adminRoutes, publicRoutes};
