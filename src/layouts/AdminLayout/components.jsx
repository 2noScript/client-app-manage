import {memo, useMemo} from 'react';
import classNames from 'classnames/bind';
import Search from '../../components/Search';
import {useSelector, useDispatch} from 'react-redux';
import {setSearchValue} from '../../store/searchKeywordReducer';
import {adminRoutes} from '../../configs/routes';
import {MdOutlineProductionQuantityLimits} from 'react-icons/md';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {IoMdPerson} from 'react-icons/io';
import {GiTabletopPlayers} from 'react-icons/gi';
import {HiUsers} from 'react-icons/hi';
import {RiLogoutCircleRLine} from 'react-icons/ri';
import {Link, useNavigate} from 'react-router-dom';
import {resetUser} from '../../store/userReducer';

const cx = classNames.bind();
const AdminHeader = memo(() => {
	const dispatch = useDispatch();
	return (
		<div className={cx('h-full flex items-center justify-center bg-violet-400')}>
			<div className={cx('')}>
				<Search
					delay={400}
					placeholder="tìm kiếm tên sản phẩm"
					onSearchChange={key => {
						dispatch(setSearchValue({searchKey: key}));
					}}
				/>
			</div>
		</div>
	);
});

const AdminLogout = memo(() => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
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
	);
});

const AdminNavBar = memo(({className}) => {
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const ROUTES = [
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
		<div
			className={cx('', {
				[className]: className,
			})}>
			{ROUTES.map((item, index) => {
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
	);
});

export {AdminHeader, AdminNavBar, AdminLogout};
