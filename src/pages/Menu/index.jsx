import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import api from '../../api';
import {useEffect, useState, memo} from 'react';
const cx = classNames.bind(styles);
function Menu() {
	const [menuData, setMenuData] = useState(null);
	useEffect(() => {
		const getApi = async () => {
			try {
				const {data} = await api.get(
					'products?token=abcd&sortBy=priceAsc&page=1&itemPerPage=20'
				);
				setMenuData(data);
			} catch {
				// setMenuData({err: 'xxx'});
				console.log('err menudata');
			}
		};
		getApi();
	}, []);

	return (
		<div className={cx('')}>
			<div className={cx('pr-64', 'container')}>
				<div className={cx('header h-16')}>MENU</div>

				<div className={cx('px-2 grid grid-cols-4 gap-4 ')}>
					{menuData &&
						menuData.productList.map(item => {
							const {
								productid,
								productname,
								productprice,
								description,
								imagelink,
								discount,
							} = item;
							return (
								<div key={productid} className={cx('h-70 bg-stone-200')}>
									<img
										src={imagelink}
										alt={description}
										className={cx('rounded-lg aspect-[4/3]')}></img>
									<div className={cx('flex')}>
										<div className={cx('grow  capitalize font-semibold')}>
											{productname}
										</div>
										<div className={cx('')}>{productprice}vnđ</div>
									</div>
									<div>{description}</div>
									<div>{discount}%</div>
								</div>
							);
						})}
				</div>
			</div>
			<div className={cx('fixed top-0 right-0 z-50 w-64 h-screen bg-green-400')}>
				123
			</div>
		</div>
	);
}

export default memo(Menu);
