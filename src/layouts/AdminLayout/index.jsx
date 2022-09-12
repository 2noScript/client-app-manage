import {Link, useNavigate} from 'react-router-dom';
import classNames from 'classnames/bind';
import {useDispatch} from 'react-redux';
import {resetUser} from '../../store/userReducer';
import {RiLogoutCircleRLine} from 'react-icons/ri';
import {adminRoutes} from '../../configs/routes';
import {memo} from 'react';
import {MdOutlineProductionQuantityLimits} from 'react-icons/md';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {IoMdPerson} from 'react-icons/io';
import {GiTabletopPlayers} from 'react-icons/gi';
import {HiUsers} from 'react-icons/hi';
const cx = classNames.bind();
function AdminLayout({children}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const PATH = [
		{
			name: 'products',
			link: adminRoutes[1].path,
			icon: <MdOutlineProductionQuantityLimits />,
		},
		{
			name: 'bill',
			link: adminRoutes[2].path,
			icon: <FaRegMoneyBillAlt />,
		},
		{
			name: 'staff',
			link: adminRoutes[3].path,
			icon: <IoMdPerson />,
		},
		{
			name: 'table',
			link: adminRoutes[4].path,
			icon: <GiTabletopPlayers />,
		},
		{
			name: 'user',
			link: adminRoutes[5].path,
			icon: <HiUsers />,
		},
	];
	return (
		<div>
			<div
				className={cx(
					'flex flex-col fixed top-0 left-0 w-40 bg-slate-200 h-screen',
					'pt-0 z-50'
				)}>
				<div className={cx('h-16 flex items-center justify-center')}>
					<div
						className={cx(
							' bg-red-400 flex items-center justify-center  px-2 py-1 rounded-md',
							'cursor-pointer hover:text-slate-300 hover:bg-slate-500'
						)}
						onClick={() => {
							dispatch(resetUser());
							localStorage.removeItem('accessToken');
							localStorage.removeItem('user');
							navigate('/', {});
						}}>
						<span className={cx('mr-2 capitalize')}>logout</span>
						<div className={cx('')}>
							<RiLogoutCircleRLine />
						</div>
					</div>
				</div>
				{PATH.map((item, index) => {
					const {name, link, icon} = item;
					return (
						<Link to={link} key={index}>
							<div
								className={cx(
									'px-3 py-1 cursor-pointer text-lg ',
									'flex items-center capitalize'
								)}>
								<span className={cx('flex items-center justify-center')}>{icon}</span>
								<span className={cx('ml-1')}> {name}</span>
							</div>
						</Link>
					);
				})}
			</div>
			<div className={cx('ml-40')}>{children}</div>
		</div>
	);
}

export default memo(AdminLayout);
