import classNames from 'classnames/bind';
// import Tippy from '@tippyjs/react';
import {useState, memo, useCallback} from 'react';
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
	const handleCloseEditProduct = useCallback(() => {
		setHide(true);
	}, [hide]);
	return (
		<div>
			{!hide && (
				<div
					className={cx(
						'fixed top-0 left-0 right-0 bottom-0',
						'z-50 bg-black/20 backdrop-opacity-10'
					)}>
					<div className={cx('abs-center')}>
						<EditProduct data={data} onClose={handleCloseEditProduct} />
					</div>
				</div>
			)}

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
				<div className={cx('w-56 truncate mr-2')}>{description}</div>
				<div className={cx('w-96 truncate')}>{imagelink}</div>
			</div>
		</div>
	);
}

export default memo(Product);
