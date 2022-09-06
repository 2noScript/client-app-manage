import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import {useCallback, memo} from 'react';
import {useSelector} from 'react-redux';
const cx = classNames.bind(styles);
function Products({menuData}) {
	const {data, loading, err} = useSelector(state => state.productsReducer);

	const fomatMoney = useCallback((money, unit) => {
		let _money = money.toString();

		// quán phèo ko có caffe giá 6 số ko --> ko cần sử lý
		if (_money.length > 3) _money = _money.slice(0, 2) + '.' + _money.slice(2);
		return _money + ' ' + unit;
	}, []);
	console.log(loading);
	return (
		<div className={cx('grid grid-cols-5 gap-4 h-screen', 'scroll-y')}>
			{!loading ? (
				data &&
				data.productList.map(item => {
					const {productid, productname, productprice, description, imagelink, discount} =
						item;
					return (
						<div key={productid} className={cx('h-80 bg-white drop-shadow-lg')}>
							<img
								src={imagelink}
								alt={description}
								className={cx('rounded-lg aspect-[4/3]')}></img>
							<div className={cx('px-1')}>
								<div className={cx('flex py-2')}>
									<div className={cx('grow  capitalize font-semibold')}>
										{productname}
									</div>
									<div className={cx('uppercase font-semibold')}>
										{fomatMoney(productprice, 'vnđ')}
									</div>
								</div>
								<div>{description}</div>
								<div>{discount}%</div>
							</div>
						</div>
					);
				})
			) : (
				<div>loading ..................</div>
			)}
		</div>
	);
}

export default memo(Products);
