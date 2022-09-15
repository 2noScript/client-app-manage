import {useCallback, memo, Fragment, useEffect, useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
// import {addListOrder} from '../../store/menuOrderReducer';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import {BsCartPlus} from 'react-icons/bs';
import api from '../../api';
import EndMessage from '../../components/EndMessage';
const cx = classNames.bind();
const MenuBanner = memo(({className}) => {
	const DATA = [
		{
			id: 1,
			url: 'https://img.freepik.com/premium-photo/tasty-espresso-served-cup-with-coffee-beans-around-spoon-view-from-dark-background-banner_1220-5751.jpg?w=2000',
		},
		{
			id: 2,
			url: 'https://t4.ftcdn.net/jpg/02/57/19/97/360_F_257199717_Xy7L8AG3k25iyrgCLZzKiNhlHmSmAtzY.jpg',
		},
		{
			id: 3,
			url: 'https://i.pinimg.com/originals/04/9c/f2/049cf2569d3f2e49feb3d3adbd87e91d.jpg',
		},
	];
	return (
		<Swiper
			className={cx('wrapper', {
				[className]: className,
			})}
			spaceBetween={0}
			slidesPerView={1}
			loop={true}
			pagination={{
				clickable: true,
			}}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
			}}
			modules={[Pagination, Autoplay]}>
			{DATA &&
				DATA?.map(item => {
					if (item.id > 0)
						return (
							<SwiperSlide
								key={item.id}
								// className={cx('rounded-md')}
								// style={{backgroundImage: `url(${item.url})`}}
							>
								<Link to={'#'}>
									<img
										src={item.url}
										width={'100%'}
										height={'100%'}
										alt="..."
										className={cx('h-full rounded-lg ')}
									/>
								</Link>
							</SwiperSlide>
						);
				})}
		</Swiper>
	);
});

const MenuOrder = memo(({className}) => {
	const {items} = useSelector(state => state.menuOrderReducer);
	console.log(items);
	return (
		<div
			className={cx('fixed top-0 left-0 w-20 h-full bg-red-400 pt-16', {
				[className]: className,
			})}>
			<div className={cx('flex items-center justify-center')}>
				<h1 className={cx('capitalize text-xl')}>my Order</h1>
			</div>
			<div>
				{items &&
					items.map(item => {
						const {id, name, amount, totalPrice} = item;
						return (
							<div key={id}>
								<div>{name}</div>
								<div>số lượng {amount}</div>
							</div>
						);
					})}
			</div>
		</div>
	);
});

const MenuProductList = memo(() => {
	const {searchKey} = useSelector(state => state.searchKeywordReducer);
	const [items, setItems] = useState([]);
	const [more, setMore] = useState(true);
	const [page, setPage] = useState(2);

	const fetchData = async ispage => {
		try {
			const {data} = await api.get('products', {
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
			setItems([...data?.productList]);
		};
		setFirstItems();
	}, []);

	const moreData = async () => {
		const {productList, info} = await fetchData(page);
		setItems([...items, ...productList]);

		if (productList.length === 0 || productList.length < info.itemPerPage) {
			setMore(false);
			return;
		}
		console.log({info, productList});
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
						const {productid, productname} = item;
						if (!productname.toLowerCase().includes(searchKey.toLowerCase()))
							return <Fragment key={productid}></Fragment>;
						return <MenuProductItem key={productid} data={item} />;
					})
				) : (
					<div>không có dữ liệu</div>
				)}
			</InfiniteScroll>
		</div>
	);
});
const MenuProductItem = memo(({data}) => {
	const {productid, productname, productprice, description, imagelink, discount} = data;
	const fomatMoney = useCallback((money, unit) => {
		if (!money) return '';
		let _money = money.toString();
		// quán phèo ko có caffe giá 6 số ko --> ko cần xử lý
		if (_money.length > 3) _money = _money.slice(0, 2) + '.' + _money.slice(2);
		return _money + ' ' + unit;
	}, []);
	return (
		<div className={cx('h-72  drop-shadow-lg shadow-slate-100')}>
			<img
				src={imagelink}
				alt={description}
				className={cx('rounded-lg aspect-[4/3]')}></img>
			<div className={cx('relative px-1 backdrop-blur-xl bg-white/30')}>
				<div className={cx('w-4/5 capitalize font-bold text-lg mt-2 truncate ')}>
					{productname}
				</div>
				<div className={cx('uppercase font-semibold text-sm mt-2')}>
					{fomatMoney(productprice, 'vnđ')}
				</div>
				<div className={cx('cursor-pointer absolute top-0 right-0 text-2xl')}>
					<BsCartPlus />
				</div>
				<div
					className={cx(
						'bg-violet-300 w-20 flex items-center justify-center ',
						'rounded-md'
					)}>
					<span className={cx('pr-1')}>sale</span>
					{discount}%
				</div>
			</div>
		</div>
	);
});
export {MenuBanner, MenuOrder, MenuProductList};
