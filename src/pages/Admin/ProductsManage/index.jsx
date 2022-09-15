import classNames from 'classnames/bind';
import {useState, useEffect, memo} from 'react';
import {AiOutlinePlusSquare} from 'react-icons/ai';
import {AdminProductCreate, AdminProductList, AdminProductPageHeader} from './components';
const cx = classNames.bind();

function ProductsManage() {
	const [hideCreateProduct, setHideCreateProduct] = useState(true);
	return (
		<div>
			{/* <div className={cx('fixed top-0 left-0 pl-40 h-16 w-full z-40 bg-red-400')}>
				<AdminProductPageHeader />
			</div> */}
			{!hideCreateProduct && (
				<div
					className={cx(
						'fixed top-0 left-0 right-0 bottom-0 bg-black/20 backdrop-opacity-10 z-50'
					)}>
					<AdminProductCreate
						onShow={() => {
							setHideCreateProduct(true);
						}}
					/>
				</div>
			)}

			<div className={cx('px-40 mt-16')}>
				<AdminProductList />
			</div>
		</div>
	);
}

export default memo(ProductsManage);
