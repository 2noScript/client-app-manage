import Product from './Product';
import {memo, useState} from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames/bind';
const cx = classNames.bind();
function ListProduct() {
	const {data} = useSelector(state => state.productsReducer);
	const [active, setActive] = useState(null);
	return (
		<>
			<div className={cx('flex  py-8 px-4 capitalize items-center ')}>
				<div className={cx('w-20 font-bold')}>id</div>
				<div className={cx('w-20 font-bold')}>status</div>
				<div className={cx('w-40 font-bold')}>name</div>
				<div className={cx('w-32 font-bold')}>price-vnđ</div>
				<div className={cx('w-32 font-bold')}>discount-%</div>
				<div className={cx('w-56 font-bold mr-2')}>description</div>
				<div className={cx('w-96 font-bold')}>url</div>
			</div>
			{data &&
				data.productList.map(item => {
					//fix serrver
					if (!item.productid | item.productid.startsWith('?'))
						return <div key={item.productid}></div>;
					return <Product key={item.productid} data={item} />;
				})}
		</>
	);
}

export default memo(ListProduct);
