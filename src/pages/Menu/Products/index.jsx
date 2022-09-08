import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import {useCallback, memo} from 'react';
import {useSelector} from 'react-redux';
import {BsCartPlus} from 'react-icons/bs';
const cx = classNames.bind(styles);
function Products() {
	const {data, loading} = useSelector(state => state.productsReducer);
	const fomatMoney = useCallback((money, unit) => {
		if (money == null) return 'ukm';
		let _money = money.toString();

		// quán phèo ko có caffe giá 6 số ko --> ko cần xử lý
		if (_money.length > 3) _money = _money.slice(0, 2) + '.' + _money.slice(2);
		return _money + ' ' + unit;
	}, []);
	return (
		<div className={cx('grid grid-cols-4 gap-4 ', '')}>
			{!loading ? (
				data &&
				data.productList.map(item => {
					const {productid, productname, productprice, description, imagelink, discount} =
						item;

					return (
						<div key={productid} className={cx('h-72  drop-shadow-lg shadow-slate-100')}>
							<img
								src={imagelink}
								alt={description}
								className={cx('rounded-lg aspect-[4/3]')}></img>
							<div className={cx('relative px-1 backdrop-blur-xl bg-white/30')}>
								<div className={cx('w-4/5 capitalize font-bold text-lg mt-2 truncate ')}>
									{productname}
								</div>
								<div className={cx('uppercase font-semibold text-sm mt-2')}>
									{fomatMoney(productprice, 'vnđ')}
								</div>
								<div className={cx('cursor-pointer absolute top-0 right-0 text-2xl')}>
									<BsCartPlus />
								</div>
								{/* <div>{description}</div> */}
								<div className={cx('w-2')}>{discount}%</div>
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
