import {useCallback, memo, Fragment, useEffect, useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// import {addListOrder} from '../../store/menuOrderReducer';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import {BsCartPlus} from 'react-icons/bs';
import api from '../../api';
import EndMessage from '../../components/EndMessage';
import {addListOrder} from '../../store/menuOrderReducer';
import {AiFillDelete} from 'react-icons/ai';
import {BiPencil} from 'react-icons/bi';
import {SiBuymeacoffee} from 'react-icons/si';
import styles from './Menu.module.scss';
import {deleteItemOfListOrder} from '../../store/menuOrderReducer';
const cx = classNames.bind(styles);
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

const MenuOrderList = memo(({className}) => {
	const dispatch = useDispatch();
	const {items} = useSelector(state => state.menuOrderReducer);

	const handleSubmitOrder = useCallback(() => {
		let data = {};
		items.forEach((item, index) => {
			const {id, amount} = item;
			// let obj = {};
			data[`product${index}id`] = id;
			data[`product${index}amount`] = amount;

			// data = [...data, obj];
		});

		const postListOrder = async () => {
			try {
				await api.post(
					'bills/orders',
					{
						...data,
						dinnertableid: localStorage.getItem('tableId'),
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: localStorage.getItem('accessToken'),
						},
					}
				);
				alert('order thành công ,xin quý khách vui lòng chờ');
			} catch {
				console.log('err');
			}
		};
		postListOrder();
		console.log(data);
	}, [items]);
	return (
		<div
			className={cx('fixed top-0 left-0 w-20 h-full bg-white pt-16', 'flex flex-col', {
				[className]: className,
			})}>
			<div className={cx('flex items-center justify-center')}>
				<h1 className={cx('capitalize text-xl')}>giỏ hàng</h1>
			</div>
			<div className={cx('py-4 px-2 flex items-center justify-center')}>
				<div
					onClick={handleSubmitOrder}
					className={cx(
						'flex items-center justify-center cursor-pointer bg-slate-200',
						'text-xl px-2 py-1 rounded-lg'
					)}>
					<div>
						<SiBuymeacoffee />
					</div>
					<div className={cx('capitalize')}>order</div>
				</div>
			</div>

			<div className={cx('scroll-y', 'grow')}>
				{items &&
					items.map(item => {
						const {id, name, amount, img} = item;
						return (
							<div key={id} className={cx('py-1 px-2 relative', 'item')}>
								<div
									className={cx(
										' shadow-slate-700 bg-slate-100 ',
										'rounded-lg px-1 py-2 backdrop-blur-sm'
									)}>
									<div className={cx('flex items-center')}>
										<div className={cx('px-1 w-32')}>
											<img
												src={img}
												alt={name}
												className={cx('aspect-[4/3] rounded-lg')}
											/>
										</div>
										<div className={cx('flex items-center')}>
											<div className={cx('px-1  text-sm flex items-center')}>x</div>
											<div
												className={cx(
													' w-8 h-8 flex items-center justify-center rounded-full',
													' bg-violet-300'
												)}>
												{amount}
											</div>
										</div>
									</div>
									<div className={cx('font-medium text-lg truncate px-1 mt-2')}>
										{name}
									</div>

									<div
										className={cx(
											'absolute top-0 left-0 right-0 bottom-0  bg-white',
											' invisible ',
											'edit'
										)}>
										<div className={cx('flex items-center justify-center h-full')}>
											{/* <div
												className={cx(
													'flex items-center justify-center text-4xl cursor-pointer'
												)}>
												<BiPencil />
											</div> */}
											<div
												onClick={() => {
													dispatch(deleteItemOfListOrder({id: id}));
												}}
												className={cx(
													'flex items-center justify-center text-4xl cursor-pointer',
													'ml-4'
												)}>
												<AiFillDelete />
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
});

const MenuProductOrder = memo(({onClose, data}) => {
	const {productid, productname, productprice, description, imagelink, discount} = data;
	const dispatch = useDispatch();

	const {items} = useSelector(state => state.menuOrderReducer);
	const [amount, setAmount] = useState(1);
	const minAmount = useMemo(() => 1, []);
	const maxAmount = useMemo(() => 50, []);

	const handlerInput = useCallback(e => {
		if (e.target.value < minAmount - 1) {
		} else if (e.target.value > maxAmount) {
		} else {
			setAmount(e.target.value);
		}
	}, []);
	// console.log(amount);

	const handleAddListOrder = useCallback(() => {
		let is = true;
		items.forEach(item => {
			const {id} = item;
			if (id == productid) {
				is = false;
				return;
			}
		});
		if (is) {
			dispatch(
				addListOrder({
					id: productid,
					name: productname,
					amount: amount,
					img: imagelink,
				})
			);
			alert('Đã thêm vào danh sách order');
			onClose();
		} else {
			alert('sản phẩm đã trong danh sách');
		}
	}, [amount, items]);
	return (
		<div className={cx('fixed left-0 top-0 right-0 bottom-0 z-50', '')}>
			<div className={cx('abs-center', 'bg-white w-96')}>
				<div onClick={onClose}>close</div>
				<div className={cx('w-64')}>
					<img
						src={imagelink}
						alt={productname}
						className={cx('rounded-lg aspect-[4/3]')}
					/>
				</div>
				<div>{productname}</div>
				<input
					type="number"
					min={minAmount}
					max={maxAmount}
					value={amount}
					onChange={handlerInput}
					className={cx('focus:outline-none border')}></input>
				<div onClick={handleAddListOrder}>thêm</div>
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
	const [hideOrder, sethideOrder] = useState(true);
	const {productid, productname, productprice, description, imagelink, discount} = data;
	const fomatMoney = useCallback((money, unit) => {
		if (!money) return '';
		let _money = money.toString();
		// quán phèo ko có caffe giá 6 số ko --> ko cần xử lý
		if (_money.length > 3) _money = _money.slice(0, 2) + '.' + _money.slice(2);
		return _money + ' ' + unit;
	}, []);

	const hanlerCloseOrder = useCallback(() => {
		sethideOrder(true);
	}, []);
	const hanlerOpenOrder = useCallback(() => {
		sethideOrder(false);
	}, []);
	return (
		<>
			<div className={cx('h-72  drop-shadow-lg shadow-slate-100')}>
				<img
					src={imagelink}
					alt={description}
					className={cx('rounded-lg aspect-[4/3]')}></img>
				<div className={cx('relative px-1 backdrop-blur-xl bg-white/30')}>
					<div className={cx('w-4/5  font-bold text-lg mt-2 truncate ')}>
						{productname}
					</div>
					<div className={cx('uppercase font-semibold text-sm mt-2')}>
						{fomatMoney(productprice, 'vnđ')}
					</div>
					<div
						className={cx('cursor-pointer absolute top-0 right-0 text-2xl')}
						onClick={hanlerOpenOrder}>
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
			{!hideOrder && <MenuProductOrder onClose={hanlerCloseOrder} data={data} />}
		</>
	);
});
export {MenuBanner, MenuOrderList, MenuProductList};
