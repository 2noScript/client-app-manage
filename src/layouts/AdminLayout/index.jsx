import {Link, useNavigate} from 'react-router-dom';
import classNames from 'classnames/bind';
import {useDispatch} from 'react-redux';
import {resetUser} from '../../store/userReducer';
import {RiLogoutCircleRLine} from 'react-icons/ri';
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
			<div className={cx('h-16 bg-slate-400 flex items-center')}>
				<div
					className={cx(
						' bg-red-400 flex items-center justify-center ml-20 px-2 py-1 rounded-md',
						'cursor-pointer hover:text-slate-300 hover:bg-slate-500'
					)}
					onClick={() => {
						dispatch(resetUser());
						localStorage.removeItem('accessToken');
						localStorage.removeItem('user');
						navigate('/', {});
					}}>
					<span className={cx('mr-2')}>exit</span>
					<div className={cx('')}>
						<RiLogoutCircleRLine />
					</div>
				</div>
			</div>
			<div className={cx('flex')}>
				{PATH.map((item, index) => {
					const {name, link} = item;
					return (
						<Link to={link} key={index}>
							<div
								className={cx('px-2 py-1 cursor-pointer capitalize text-lg font-bold')}>
								{name}
							</div>
						</Link>
					);
				})}
			</div>
			{children}
		</div>
	);
}

export default AdminLayout;
