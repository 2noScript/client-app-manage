import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import {memo} from 'react';
import {MenuBanner, MenuOrderList, MenuProductList} from './components';
const cx = classNames.bind(styles);
function Menu() {
	return (
		<>
			<div className={cx('pl-64 pr-4 ')}>
				<div className={cx('py-4')}></div>
				<MenuBanner className={cx('aspect-[9/2]')} />
				<div className={cx('px-16 mt-16')}>
					<MenuProductList />
				</div>
			</div>
			<MenuOrderList className={cx('w-60')} />
		</>
	);
}

export default memo(Menu);
