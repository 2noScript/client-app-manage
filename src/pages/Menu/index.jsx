import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
// import api from '../../api';
import {memo} from 'react';
import Order from './Order';
import Products from './Products';
import Otions from './Options';
const cx = classNames.bind(styles);
function Menu() {
	// const [menuData, setMenuData] = useState(null);
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(
	// 		fetchProductsList({
	// 			page: 1,
	// 			itemPerPage: 20,
	// 		})
	// 	);
	// }, []);
	return (
		<div className={cx(' grid grid-cols-12')}>
			<div className={cx(' col-span-9', 'container scroll-y h-screen')}>
				<div className={cx('sticky top-0 z-50  px-8 py-4 bg-white', '')}>
					<Otions />
				</div>
				{/* <div className={cx('h-20')}></div> */}
				<div
					className={cx('px-8 pt-8', '')}
					onScroll={e => {
						e.stopPropagation();
					}}>
					<Products />
				</div>
				<div className={cx('h-80')}></div>
			</div>

			<div className={cx('col-span-3 h-screen bg-green-400', '')}>
				<Order />
			</div>
		</div>
	);
}

export default memo(Menu);
