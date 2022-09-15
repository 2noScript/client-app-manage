import {useCallback, memo, Fragment, useEffect, useState, useMemo} from 'react';
import {useSelector} from 'react-redux';
import api from '../../../api';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames/bind';

const cx = classNames.bind();
const AdminBillList = memo(() => {
	const {searchKey} = useSelector(state => state.searchKeywordReducer);
	const [items, setItems] = useState([]);
	const [more, setMore] = useState(true);
	const [page, setPage] = useState(2);

	//first data

	const fetchData = async ispage => {
		try {
			const {data} = await api.get('bills', {
				params: {
					itemPerPage: 15,
					page: ispage,
				},
				headers: {
					Authorization: localStorage.getItem('accessToken'),
				},
			});
			return data;
		} catch {
			console.log('err');
			return null;
		}
	};

	useEffect(() => {
		const setFirstItems = async () => {
			const data = await fetchData(1);
			const {billList, info} = data;
			if (billList.length === 0 || billList.length < info.itemPerPage) {
				setMore(false);
				return;
			}
			setItems([...data?.billList]);
			console.log(data);
		};
		setFirstItems();
	}, []);

	const moreData = async () => {
		const {billList, info} = await fetchData(page);
		setItems([...items, ...billList]);

		if (billList.length === 0 || billList.length < info.itemPerPage) {
			setMore(false);
			console.log('xxx??');
			return;
		}
		console.log({info, billList});
		setPage(page + 1);
	};
	return (
		<div>
			<InfiniteScroll
				className={cx('grid grid-cols-5 gap-4 ', '')}
				dataLength={items.length}
				next={moreData}
				hasMore={more}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{textAlign: 'center'}}>
						<b>Yay! You have seen it all</b>
					</p>
				}>
				{items ? (
					items.map(item => {
						const {} = item;

						return <AdminBillItem index={item} />;
					})
				) : (
					<div>không có dữ liệu</div>
				)}
			</InfiniteScroll>
		</div>
	);
});

const AdminBillItem = memo(() => {
	return <div></div>;
});

export {AdminBillItem, AdminBillList};
