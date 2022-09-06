import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import {AiOutlineHome, AiOutlineHeart} from 'react-icons/ai';
import {GiStabbedNote} from 'react-icons/gi';
import {useMemo, memo, useState, useCallback} from 'react';
import {Link, useLocation} from 'react-router-dom';
const cx = classNames.bind(styles);
function NavBar() {
	// const [active, setActive] = useState('home');
	// let {pathname} = useLocation();
	// console.log(pathname);
	const TABS = useMemo(() => {
		const _TABS = [
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
		return _TABS;
	}, []);

	// const handleActive = useCallback(name => {
	// 	setActive(name);
	// }, []);
	return (
		<div className={cx('pt-40 fixed top-0 left-0 z-50 bg-slate-200 w-20 h-screen')}>
			<nav>
				{TABS.map(item => {
					const {name, ico, link} = item;
					return (
						<Link
							to={link}
							key={name}
							onClick={() => {
								// handleActive(name);
							}}
							className={cx('flex items-center justify-center h-14 hover:text-red-400')}>
							<div
								className={cx(
									'text-3xl cursor-pointer',
									// `${pathname === '/' + name && 'active'}`
								)}>
								{ico}
							</div>
						</Link>
					);
				})}
			</nav>
		</div>
	);
}

export default memo(NavBar);
