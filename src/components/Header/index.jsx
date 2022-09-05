import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {useCallback, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
const cx = classNames.bind(styles);

function Header() {
	const [itemActive, setItemActive] = useState('home');
	const MENUS = useMemo(() => {
		const _MENUS = [
			{
				name: 'home',
				link: '/',
			},
			{
				name: 'menu',
				link: '/menu',
			},
			{
				name: 'review',
				link: '',
			},
			{
				name: 'order',
				link: '',
			},
			{
				name: 'about',
				link: '',
			},
		];
		return _MENUS;
	}, [itemActive]);

	//handle click menu
	const handleMenuItemClick = useCallback(name => {
		setItemActive(name);
	}, []);
	return (
		<header className={cx('fixed top-0 left-0 w-screen h-16 bg-white', 'wrapper')}>
			<ul className={cx('flex', 'menu')}>
				{MENUS.map((item, index) => {
					const {name, link} = item;
					return (
						<Link to={link} key={index}>
							<li
								className={cx(
									'relative cursor-pointer w-20 capitalize flex items-center justify-center'
								)}
								onClick={() => {
									handleMenuItemClick(name);
								}}>
								<div className={cx('font-normal text-lg text-zinc-400')}>
									{name}
								</div>
								<div
									className={cx(
										'absolute w-0 bg-zinc-500',
										'line',
										`${name === itemActive && 'line-active'}`
									)}></div>
							</li>
						</Link>
					);
				})}
			</ul>
		</header>
	);
}

export default Header;
