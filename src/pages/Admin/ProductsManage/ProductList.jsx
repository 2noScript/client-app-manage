import Product from './Product';
import {memo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchProductsList} from '../../../store/productsReducer';
const cx = classNames.bind();
function ListProduct({searchKey}) {
	const {data, info} = useSelector(state => state.productsReducer);
	const [listData, setListData] = useState([]);
	const [page, setPage] = useState(1);
	const [more, setMore] = useState(true);
	const dispatch = useDispatch();
	const fetchData = () => {
		if (info?.maxPage < page) {
			setMore(false);
			return;
		}
		setPage(page + 1);
		dispatch(fetchProductsList({keyword: searchKey, page: page}));
		setListData([...listData, ...data?.productList]);
		console.log(page);
	};

	useEffect(() => {
		dispatch(fetchProductsList({keyword: searchKey, page: page}));

		// setListData([...listData, ...data?.productList]);
	}, [page, searchKey]);
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
			{/* {listData && (
				<InfiniteScroll
					dataLength={listData}
					loader={<h4>Loading...</h4>}
					hasMore={more}
					next={fetchData}
					endMessage={<p className="animes__list--endMessage">You have seen it all</p>}>
					{listData.map(item => {
						//fix serrver
						if (!item.productid | item.productid.startsWith('?'))
							return <div key={item.productid}></div>;
						return <Product key={item.productid} data={item} />;
					})}
				</InfiniteScroll>
			)} */}
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
