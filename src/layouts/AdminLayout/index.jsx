import {Link, useNavigate} from 'react-router-dom';
import classNames from 'classnames/bind';
import {useDispatch} from 'react-redux';
import {resetUser} from '../../store/userReducer';
const cx = classNames.bind();
function AdminLayout({children}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const PATH = [
		{
			name: 'products',
			link: '/admin/products',
		},
		{
			name: 'bill',
			link: '/admin/bill',
		},
		{
			name: 'staff',
			link: '/admin/staff',
		},
		{
			name: 'table',
			link: '/admin/table',
		},
		{
			name: 'user',
			link: '/admin/user',
		},
	];
	return (
		<div>
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
				{PATH.map((item, index) => {
					const {name, link} = item;
					return (
						<Link to={link} key={index}>
							<div className={cx('px-2 py-1 cursor-pointer capitalize')}>{name}</div>
						</Link>
					);
				})}
			</div>
			{children}
		</div>
	);
}

export default AdminLayout;
