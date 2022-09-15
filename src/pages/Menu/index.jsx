import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import {memo} from 'react';
import {MenuBanner, MenuOrder, MenuProductList} from './components';
const cx = classNames.bind(styles);
function Menu() {
	return (
		<>
			<div className={cx('pl-56 pr-4 ')}>
				<div className={cx('py-4')}></div>
				<MenuBanner className={cx('aspect-[9/2]')} />
				<div className={cx('px-16 mt-16')}>
					<MenuProductList />
				</div>
			</div>
			<MenuOrder className={cx('w-52')} />
		</>
	);
}

export default memo(Menu);
