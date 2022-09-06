import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
// import api from '../../api';
import {useEffect, useState, memo, useCallback} from 'react';
import Banner from './Banner';
import Order from './Order';
import Products from './Products';
import Otions from './Options';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProductsList} from '../../store/productsReducer';
const cx = classNames.bind(styles);
function Menu() {
	const [menuData, setMenuData] = useState(null);
	const {data, loading, err} = useSelector(state => state.productsReducer);
	const dispatch = useDispatch();
	// console.log(data);

	useEffect(() => {
		dispatch(
			fetchProductsList({
				page: 1,
				itemPerPage: 20,
			})
		);
	}, []);
	useEffect(() => {
		data && setMenuData(data);
	}, [data]);
	return (
		<div className={cx('bg-stone-100')}>
			<div className={cx('pr-72', 'container')}>
				<div className={cx('header h-20')}>MENU</div>
				<div className={cx('px-2')}>
					<Banner data={null} />
				</div>
				<div className={cx('sticky top-0 z-50 bg-white')}>
					<Otions />
				</div>
				<div className={cx('px-8 ')}>{!loading && <Products menuData={menuData} />}</div>
			</div>

			<div className={cx('fixed top-0 right-0 z-50 w-72 h-screen bg-green-400')}>
				<Order />
			</div>
		</div>
	);
}

export default memo(Menu);
