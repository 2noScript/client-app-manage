import classNames from 'classnames/bind';
import {useState, useEffect, memo} from 'react';
import {AiOutlinePlusSquare} from 'react-icons/ai';
import ListProduct from './ProductList';
import CreateProduct from './CreateProduct';
import {useDebounce} from '@react-hook/debounce';
import {useDispatch} from 'react-redux';
import {fetchProductsList} from '../../../store/productsReducer';
const cx = classNames.bind();

function ProductsManage() {
	const [hideCreateProduct, setHideCreateProduct] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [searchDebounce, setSearchDebounce] = useDebounce(searchValue, 500);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProductsList({keyword: searchDebounce, itemPerPage: 100, page: 1}));
	}, [searchDebounce]);
	useEffect(() => {
		setSearchDebounce(searchValue);
	}, [searchValue]);
	return (
		<div>
			<div
				className={cx(
					'fixed top-0 left-0 z-40 items-center justify-center pl-40',
					'h-16 bg-violet-400 flex items-center w-full '
				)}>
				<div
					onClick={e => {
						setHideCreateProduct(!hideCreateProduct);
					}}
					className={cx(
						' px-2 py-2 bg-red-400 flex items-center justify-center cursor-pointer',
						'rounded-full mr-2 '
					)}>
					<AiOutlinePlusSquare />
				</div>
				<div className={cx(' bg-red-100 rounded-full px-3 py-1 w-96')}>
					<input
						className={cx(
							'w-full bg-transparent placeholder:text-center placeholder:capitalize'
						)}
						type="text"
						placeholder="tìm kiếm tên sản phẩm"
						value={searchValue}
						onChange={e => {
							setSearchValue(e.target.value);
						}}
					/>
				</div>
			</div>
			{!hideCreateProduct && (
				<div
					className={cx(
						'fixed top-0 left-0 right-0 bottom-0 bg-black/20 backdrop-opacity-10 z-50'
					)}>
					<CreateProduct
						onClick={() => {
							setHideCreateProduct(true);
						}}
					/>
				</div>
			)}
			<div className={cx('px-40 mt-16')}>
				<ListProduct />
			</div>
		</div>
	);
}

export default memo(ProductsManage);
