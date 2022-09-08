import api from '../../../api';
import classNames from 'classnames/bind';
import {useState, useEffect} from 'react';
import {AiOutlinePlusSquare} from 'react-icons/ai';
import ListProduct from './ListProduct';
import CreateProduct from './CreateProduct';
import {useDebounce} from '@react-hook/debounce';
const cx = classNames.bind();

function ProductsManage() {
	const [data, setData] = useState([]);
	const [hideCreateProduct, setHideCreateProduct] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [searchDebounce, setSearchDebounce] = useDebounce(searchValue, 500);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data} = await api.get('products/search', {
					params: {
						token: localStorage.getItem('accessToken'),
						keyword: searchDebounce,
						itemPerPage: 100,
						page: 1,
					},
				});
				const {productList} = data;
				setData(productList);
			} catch {
				console.log('err');
			}
		};
		fetchData();
	}, [searchDebounce]);
	useEffect(() => {
		setSearchDebounce(searchValue);
	}, [searchValue]);
	return (
		<div className={cx('relative')}>
			<div className={cx('text-red-500')}>product</div>
			<div>
				<input
					type="text"
					placeholder="tìm kiếm tên sản phẩm"
					value={searchValue}
					onChange={e => {
						setSearchValue(e.target.value);
					}}
				/>
			</div>
			<div
				onClick={e => {
					setHideCreateProduct(!hideCreateProduct);
				}}
				className={cx(
					'h-10 w-10 bg-red-400 flex items-center justify-center cursor-pointer'
				)}>
				<AiOutlinePlusSquare />
			</div>
			<div
				className={cx('absolute', 'top-0')}
				style={{
					left: '80px ',
				}}>
				{!hideCreateProduct && <CreateProduct />}
			</div>
			<div className={cx('px-40')}>
				<div className={cx('flex  mb-10 capitalize px-4')}>
					<div className={cx('w-20 font-bold')}>id</div>
					<div className={cx('w-20 font-bold')}>status</div>
					<div className={cx('w-40 font-bold')}>name</div>
					<div className={cx('w-32 font-bold')}>price-vnđ</div>
					<div className={cx('w-32 font-bold')}>discount-%</div>
					<div className={cx('w-64 font-bold')}>description</div>
					<div className={cx('w-96 font-bold')}>url</div>
				</div>
				<ListProduct data={data} />
			</div>
		</div>
	);
}

export default ProductsManage;
