import classNames from 'classnames/bind';
import {useCallback, memo, Fragment, useEffect, useState, useMemo} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from '../../../api';
import {useSelector} from 'react-redux';
import EndMessage from '../../../components/EndMessage';
const cx = classNames.bind();

const AdminStaffList = memo(() => {
	const {searchKey} = useSelector(state => state.searchKeywordReducer);
	const [items, setItems] = useState([]);
	const [more, setMore] = useState(true);
	const [page, setPage] = useState(2);

	//first data

	const fetchData = async ispage => {
		try {
			const {data} = await api.get('staffs', {
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
			const {staffList, info} = data;
			setItems([...data?.staffList]);
			if (staffList.length === 0 || staffList.length < info.itemPerPage) {
				setMore(false);
				return;
			}
		};
		setFirstItems();
	}, []);

	const moreData = async () => {
		const {staffList, info} = await fetchData(page);
		setItems([...items, ...staffList]);

		if (staffList.length === 0 || staffList.length < info.itemPerPage) {
			setMore(false);
			return;
		}
		console.log({info, staffList});
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
				endMessage={<EndMessage />}>
				{items ? (
					items.map(item => {
						const {staffid} = item;
						return <AdminStaffItem key={staffid} data={item} />;
					})
				) : (
					<div>không có dữ liệu</div>
				)}
			</InfiniteScroll>
		</div>
	);
});
const AdminStaffItem = memo(({data}) => {
	const maleImage = useMemo(
		() => 'https://i.pinimg.com/564x/22/25/e9/2225e910f8cc9977454eea9b9db96be7.jpg',
		[]
	);
	const femaleImage = useMemo(
		() =>
			'https://toigingiuvedep.vn/wp-content/uploads/2021/02/hinh-anh-avatar-den-trang-nu.jpg',
		[]
	);
	const {staffid, billList, sex, staffdateofbirth, staffname, workstarttime} = data;
	return (
		<div className={cx('')}>
			<div className={cx('px-6')}>
				<img
					src={`${sex === 1 ? maleImage : femaleImage}`}
					alt=""
					className={cx('aspect-[4/3]')}
				/>
			</div>
			<div>{staffid}</div>
			<div>{billList}</div>
			<div>{sex}</div>
			<div>{staffdateofbirth}</div>
			<div>{staffname}</div>
			<div>{workstarttime}</div>
		</div>
	);
});

export {AdminStaffList, AdminStaffItem};
