import 'swiper/css';
import 'swiper/css/pagination';
import {memo, useCallback, useMemo} from 'react';

import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Search from '../../components/Search';
import {setSearchValue} from '../../store/searchKeywordReducer';
import {AiOutlineHome, AiOutlineHeart} from 'react-icons/ai';
import {GiStabbedNote} from 'react-icons/gi';
import classNames from 'classnames/bind';
import {resetUser} from '../../store/userReducer';
const cx = classNames.bind();
const MenuHeader = memo(({className}) => {
	const dispatch = useDispatch();
	const hanleSetSearchKeyword = useCallback(key => {
		dispatch(setSearchValue({searchKey: key}));
	}, []);
	return (
		<div
			className={cx('fixed w-full z-50 flex top-0 left-0 items-center justify-center', {
				[className]: className,
			})}>
			<div>
				<Search
					delay={400}
					onSearchChange={hanleSetSearchKeyword}
					className={cx('w-96')}
					placeholder="tìm kiếm tên sản phẩm"
				/>
			</div>
			{/* <MenuNavBar className={cx('ml-20')} /> */}
			<MenuLogout />
		</div>
	);
});

const MenuNavBar = memo(({className}) => {
	let {pathname} = useLocation();

	const TABS = useMemo(() => {
		return [
			{
				name: 'home',
				ico: <AiOutlineHome />,
				link: '/home',
			},
			{
				name: 'heart',
				ico: <AiOutlineHeart />,
				link: '/heart',
			},
			{
				name: 'menu',
				ico: <GiStabbedNote />,
				link: '/menu',
			},
		];
	}, []);
	return (
		<div
			className={cx('flex top-0 left-0 z-50 bg-slate-200 ', {
				[className]: className,
			})}>
			{TABS.map(item => {
				const {name, ico, link} = item;
				return (
					<Link
						to={link}
						key={name}
						onClick={() => {
							// handleActive(name);
						}}
						className={cx(
							'flex items-center justify-center h-14 hover:text-red-400',
							'px-1'
						)}>
						<div
							className={cx(
								'text-3xl cursor-pointer',
								`${pathname === '/' + name && 'active'}`
							)}>
							{ico}
						</div>
					</Link>
				);
			})}
		</div>
	);
});

// const MenuOrder = memo(() => {});

const MenuLogout = memo(({className}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<div
			className={cx('cursor-pointer px-4 py-4', {
				[className]: className,
			})}
			onClick={() => {
				dispatch(resetUser());
				localStorage.removeItem('accessToken');
				localStorage.removeItem('user');
				navigate('/', {});
			}}>
			thoát
		</div>
	);
});
export {MenuHeader, MenuNavBar};
