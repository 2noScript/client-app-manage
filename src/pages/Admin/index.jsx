import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useState, memo} from 'react';
import {resetUser} from '../../store/userReducer';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';

import ProductsManage from './ProductsManage';
import Billmanage from './BillManage';
import StaffManage from './StaffManage';
import UserManage from './UserManage';
import TableManage from './TableManage';

const cx = classNames.bind(styles);
function Admin() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [manage, setManage] = useState();
	const MANAGE = [
		{
			name: 'product',
			content: <ProductsManage />,
		},
		{
			name: 'staff',
			content: <StaffManage />,
		},
		{
			name: 'bill',
			content: <Billmanage />,
		},
		{
			name: 'table',
			content: <TableManage />,
		},
		{
			name: 'user',
			content: <UserManage />,
		},
	];
	return (
		<div
		// onClick={() => {
		// 	dispatch(resetUser());
		// 	localStorage.removeItem('accessToken');
		// 	localStorage.removeItem('user');
		// 	navigate('/', {});
		// }}
		>
			<div
				className={cx('h-20 bg-slate-400')}
				onClick={() => {
					dispatch(resetUser());
					localStorage.removeItem('accessToken');
					localStorage.removeItem('user');
					navigate('/', {});
				}}>
				thoát
			</div>
			<div className={cx('flex')}>
				{MANAGE.map((item, index) => {
					const {name} = item;
					return (
						<div
							key={index}
							className={cx('px-2 py-1 cursor-pointer capitalize')}
							onClick={() => {
								setManage(name);
							}}>
							{name}
						</div>
					);
				})}
			</div>
			<div>
				{MANAGE.map((item, index) => {
					if (item.name === manage) return <div key={index}>{item.content}</div>;
					return <div key={index}></div>;
				})}
			</div>
		</div>
	);
}

export default memo(Admin);
