import classNames from 'classnames/bind';
// import Tippy from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless';
import {useState, memo} from 'react';
import EditProduct from './EditProduct';
const cx = classNames.bind();
function Product({data}) {
	const [hide, setHide] = useState(true);
	const {
		productid,
		productname,
		productprice,
		itemstatus,
		discount,
		description,
		imagelink,
	} = data;
	return (
		<div>
			<Tippy
				key={productid}
				offset={[0, -20]}
				placement={'bottom'}
				render={attrs => (
					<div className={cx('bg-red-600 px-20 py-20')} tabIndex="-1" {...attrs}>
						{!hide && <EditProduct data={data} />}
					</div>
				)}
				visible={!hide}
				interactive={true}
				onClickOutside={() => {
					setHide(true);
				}}>
				<div
					onClick={() => {
						setHide(false);
					}}
					className={cx(
						'flex  py-2 cursor-pointer mt-2 hover:text-red-400 bg-slate-100',
						'px-4 rounded-md'
					)}>
					<div className={cx('w-20')}>{productid}</div>
					<div className={cx('w-20 ')}>{itemstatus}</div>
					<div className={cx('w-40 truncate')}>{productname}</div>
					<div className={cx('w-32')}>{productprice}</div>
					<div className={cx('w-32')}>{discount}</div>
					<div className={cx('w-64 truncate')}>{description}</div>
					<div className={cx('w-96 truncate')}>{imagelink}</div>
				</div>
			</Tippy>
		</div>
	);
}

export default memo(Product);
