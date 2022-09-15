import {memo, useState, useEffect, useCallback, Fragment} from 'react';
import {useSelector} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from '../../../api';
import classNames from 'classnames/bind';
import {useMemo} from 'react';
const cx = classNames.bind();
const AdminTableList = memo(() => {
	const {searchKey} = useSelector(state => state.searchKeywordReducer);
	const [items, setItems] = useState([]);
	const [more, setMore] = useState(true);
	const [page, setPage] = useState(2);

	const fetchData = async ispage => {
		try {
			const {data} = await api.get('dinner-tables', {
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
	//first data

	useEffect(() => {
		const setFirstItems = async () => {
			const data = await fetchData(1);
			setItems([...data?.dinnerTableList]);
		};
		setFirstItems();
	}, []);

	const moreData = async () => {
		const {dinnerTableList, info} = await fetchData(page);
		setItems([...items, ...dinnerTableList]);

		if (dinnerTableList.length === 0 || dinnerTableList.length < info.itemPerPage) {
			setMore(false);
			return;
		}
		// console.log({info, dinnerTableList});
		setPage(page + 1);
	};
	console.log(items);
	return (
		<div>
			<InfiniteScroll
				className={cx('grid grid-cols-4 gap-4 ', '')}
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
						const {dinnertableid} = item;

						return <AdminTableItem data={item} className={cx('')} key={dinnertableid} />;
					})
				) : (
					<div>không có dữ liệu</div>
				)}
			</InfiniteScroll>
		</div>
	);
});

const AdminTableItem = memo(({data, className}) => {
	const {dinnertablename, billList, dinnertableid} = data;
	const urlImageTable = useMemo(() => {
		// joke
		return 'https://static.vecteezy.com/system/resources/thumbnails/010/836/663/small/dining-table-icon-design-vector.jpg';
	});
	return (
		<div
			className={cx('flex items-center', {
				[className]: className,
			})}>
			<img src={urlImageTable} alt={dinnertablename} />
			<div>
				<div className={cx('max-w-xs')}>{dinnertablename}</div>
			</div>
		</div>
	);
});

const AdminTableCreate = memo(() => {
	return <div></div>;
});

const AdminTableEdit = memo(() => {
	return <div></div>;
});

export {AdminTableList, AdminTableItem, AdminTableCreate, AdminTableEdit};
