import {memo, useState, useCallback, useEffect, Fragment} from 'react';
import classNames from 'classnames/bind';
import api from '../../../api';
import {MdClose, MdOutlineSystemUpdateAlt} from 'react-icons/md';
import {AiFillDelete, AiOutlinePlusSquare} from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector, useDispatch} from 'react-redux';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Search from '../../../components/Search';
import {setSearchValue} from '../../../store/searchKeywordReducer';

const cx = classNames.bind();

const AdminProductCreate = memo(({onShow}) => {
	const [formData, setFormData] = useState({
		productname: '',
		productid: '',
		productprice: '',
		description: '',
		discount: '',
		itemstatus: '',
		imagelink: '',
	});
	const cheackFormData = useCallback(() => {
		const {
			productname,
			productid,
			productprice,
			description,
			discount,
			itemstatus,
			imagelink,
		} = formData;
		if (
			productname.trim().length > 0 &&
			productid.trim().length > 0 &&
			productprice.trim().length > 0 &&
			description.trim().length > 0 &&
			discount.trim().length > 0 &&
			itemstatus.trim().length > 0 &&
			imagelink.trim().length > 0
		) {
			return true;
		} else return false;
	}, [formData]);

	const hanlePost = useCallback(async () => {
		try {
			await api.post(
				'products',
				{
					...formData,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: localStorage.getItem('accessToken'),
					},
				}
			);
			alert('thêm sản phẩm thành công');
			window.location.reload();
		} catch {
			alert('đã có lỗi xảy ra');
		}
	}, [formData]);
	const hanleSubmit = useCallback(() => {
		if (cheackFormData()) {
			hanlePost();
		} else {
			alert('thông tin không được bỏ trống và không được chỉ có khoảng trắng');
		}
	}, [formData]);
	return (
		<div
			className={cx('bg-white rounded-lg', 'abs-center overflow-hidden')}
			style={{width: 540}}>
			<div className={cx('flex bg-violet-500 ')}>
				<div
					className={cx(
						'flex items-center justify-center py-1 font-medium text-lg',
						'grow text-white'
					)}>
					Thêm sản phẩm mới
				</div>
				<div
					onClick={onShow}
					className={cx(
						'cursor-pointer flex items-center justify-center text-2xl',
						'w-12 text-red-500'
					)}>
					<MdClose />
				</div>
			</div>
			<div className={cx('px-4 py-4')}>
				<div className={cx('flex')}>
					<div
						className={cx(
							'px-2 border-slate-100 rounded bg-slate-200 mt-2 max-w py-1',
							'grow'
						)}
						style={{
							borderWidth: '1px',
						}}>
						<input
							className={cx(' placeholder:capitalize bg-transparent')}
							type="text"
							placeholder="tên sản phẩm"
							value={formData.productname}
							onChange={e => {
								setFormData({...formData, productname: e.target.value});
							}}
						/>
					</div>

					<div
						className={cx('px-2 border-slate-100 rounded bg-slate-200 mt-2 py-1')}
						style={{
							borderWidth: '1px',
						}}>
						<input
							className={cx('placeholder:capitalize bg-transparent')}
							type="text"
							placeholder="mã sản phẩm"
							value={formData.productid}
							onChange={e => {
								setFormData({...formData, productid: e.target.value});
							}}
						/>
					</div>
				</div>

				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-200 mt-2')}
					style={{
						borderWidth: '1px',
					}}>
					<textarea
						className={cx('w-full placeholder:capitalize bg-transparent')}
						cols="4"
						rows="2"
						placeholder="mô tả sản phẩm"
						value={formData.description}
						onChange={e => {
							setFormData({...formData, description: e.target.value});
						}}
					/>
				</div>

				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-200 mt-2')}
					style={{
						borderWidth: '1px',
					}}>
					<textarea
						className={cx(
							'w-full placeholder:capitalize bg-transparent',
							'active:border-none'
						)}
						name=""
						id=""
						cols="4"
						rows="2"
						placeholder="nguồn hình ảnh"
						value={formData.imagelink}
						onChange={e => {
							setFormData({...formData, imagelink: e.target.value});
						}}></textarea>
				</div>
				<div className={cx('flex')}>
					<div
						className={cx('px-2 border-slate-100 rounded bg-slate-200 mt-2 w-32 py-1')}
						style={{
							borderWidth: '1px',
						}}>
						<input
							className={cx('placeholder:capitalize bg-transparent')}
							type="text"
							placeholder="giá tiền"
							value={formData.productprice}
							onChange={e => {
								setFormData({...formData, productprice: e.target.value});
							}}
						/>
					</div>
					<div
						className={cx('px-2 border-slate-100 rounded bg-slate-200 mt-2 py-1 w-36')}
						style={{
							borderWidth: '1px',
						}}>
						<input
							className={cx(' placeholder:capitalize bg-transparent')}
							type="text"
							placeholder="giảm giá(%)"
							value={formData.discount}
							onChange={e => {
								setFormData({...formData, discount: e.target.value});
							}}
						/>
					</div>
					<div
						className={cx('px-2 border-slate-100 rounded bg-slate-200 mt-2 w-24 py-1')}
						style={{
							borderWidth: '1px',
						}}>
						<input
							className={cx(' placeholder:capitalize bg-transparent')}
							type="text"
							placeholder="trạng thái"
							value={formData.itemstatus}
							onChange={e => {
								setFormData({...formData, itemstatus: e.target.value});
							}}
						/>
					</div>

					<button
						className={cx('px-2  rounded bg-slate-500 mt-2 w-24 py-1  grow')}
						onClick={hanleSubmit}>
						khởi tạo
					</button>
				</div>
			</div>
		</div>
	);
});

const AdminProductEdit = memo(({data, onClose}) => {
	const [formData, setFormData] = useState(data);
	const cheackFormData = useCallback(() => {
		console.log(formData);

		const {
			productname,
			productid,
			productprice,
			description,
			discount,
			itemstatus,
			imagelink,
		} = formData;

		if (
			productname.trim().length > 0 &&
			productid.trim().length > 0 &&
			productprice.toString().trim().length > 0 &&
			description.trim().length > 0 &&
			discount.toString().trim().length > 0 &&
			itemstatus.toString().trim().length > 0 &&
			imagelink.trim().length > 0
		) {
			return true;
		} else return false;
	}, [formData]);

	const handleDelete = useCallback(() => {
		const deleteProduct = async () => {
			try {
				await api.delete(`products/${data.productid}/`, {
					params: {
						token: localStorage.getItem('accessToken'),
					},
					headers: {
						Authorization: localStorage.getItem('accessToken'),
					},
				});
				alert('xóa thành công');
				window.location.reload();
			} catch {
				alert('err');
			}
		};
		deleteProduct();
	}, [data]);

	const handleUpdate = useCallback(() => {
		const dataSubmit = {
			...formData,
			productidold: data?.productid,
		};

		const updateProduct = async () => {
			try {
				await api.put(
					'products',
					{
						...dataSubmit,
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: localStorage.getItem('accessToken'),
						},
					}
				);
				alert('chỉnh sửa thành công');
				window.location.reload();
			} catch {
				alert('chỉnh sửa ko thành công');
			}
		};

		if (cheackFormData()) updateProduct();
		else alert('thông tin không được bỏ trống');
	}, [formData]);
	return (
		<div
			className={cx('flex flex-col bg-violet-50 rounded', 'overflow-hidden rounded-lg')}>
			<div className={cx('py-1 bg-violet-500 text-lg', 'flex items-center')}>
				<div className={cx('grow')}></div>
				<div
					className={cx('cursor-pointer px-2 h-7', 'flex items-center justify-center')}
					onClick={onClose}>
					<MdClose />
				</div>
			</div>
			<div className={cx('px-1')}>
				<div>
					<div className={cx('flex items-center bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>code</div>
						<input
							type="text"
							className={cx('bg-white px-2 rounded')}
							value={formData.productid}
							onChange={e => {
								setFormData({...formData, productid: e.target.value});
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>status</div>
						<input
							type="text"
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							value={formData.itemstatus}
							onChange={e => {
								setFormData({...formData, itemstatus: e.target.value});
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>name</div>
						<input
							type="text"
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							value={formData.productname}
							onChange={e => {
								setFormData({...formData, productname: e.target.value});
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>price</div>
						<input
							type="text"
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							value={formData.productprice}
							onChange={e => {
								setFormData({...formData, productprice: e.target.value});
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>discount</div>
						<input
							type="text"
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							value={formData.discount}
							onChange={e => {
								setFormData({...formData, discount: e.target.value});
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold ')}>description</div>
						<textarea
							type="text"
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							value={formData.description}
							onChange={e => {
								setFormData({...formData, description: e.target.value});
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold ')}>imagelink</div>
						<textarea
							type="text"
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							value={formData.imagelink}
							onChange={e => {
								setFormData({...formData, imagelink: e.target.value});
							}}
						/>
					</div>
				</div>
				<div className={cx('mt-4 flex items-center justify-center mb-2')}>
					<ButtonPrimary
						onClick={handleUpdate}
						icon={<MdOutlineSystemUpdateAlt />}
						text="update"
						className={cx('text-violet-500')}
					/>
					<ButtonPrimary
						onClick={handleDelete}
						icon={<AiFillDelete />}
						text="delete"
						className={cx('text-red-600')}
					/>
				</div>
			</div>
		</div>
	);
});

const AdminProductDelete = memo(({data}) => {
	const handleDelete = useCallback(() => {
		const deleteProduct = async () => {
			try {
				await api.delete(`products/${data.productid}/`, {
					params: {
						token: localStorage.getItem('accessToken'),
					},
					headers: {
						Authorization: localStorage.getItem('accessToken'),
					},
				});
				alert('xóa thành công');
				window.location.reload();
			} catch {
				alert('err');
			}
		};
		deleteProduct();
	}, [data]);

	return (
		<div
			onClick={handleDelete}
			className={cx('cursor-pointer px-4 text-red-800', 'flex items-center ')}>
			<span className={cx('font-semibold')}>
				<AiFillDelete />
			</span>
			<span className={cx('capitalize font-semibold')}>delete</span>
		</div>
	);
});

const AdminProductItem = memo(({data}) => {
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
						<AdminProductEdit data={data} onClose={handleCloseEditProduct} />
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
});

const AdminProductList = memo(() => {
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
			console.log('xxx??');
			return;
		}
		console.log({info, productList});
		setPage(page + 1);
	};
	return (
		<div>
			<div className={cx('flex  py-8 px-4 capitalize items-center ')}>
				<div className={cx('w-20 font-bold')}>code</div>
				<div className={cx('w-20 font-bold')}>status</div>
				<div className={cx('w-40 font-bold')}>name</div>
				<div className={cx('w-32 font-bold')}>price-vnđ</div>
				<div className={cx('w-32 font-bold')}>discount-%</div>
				<div className={cx('w-56 font-bold mr-2')}>description</div>
				<div className={cx('w-96 font-bold')}>url</div>
			</div>
			<InfiniteScroll
				// className={cx('grid grid-cols-5 gap-4 ', '')}
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
						const {productid, productname} = item;
						if (!productname.toLowerCase().includes(searchKey.toLowerCase()))
							return <Fragment key={productid}></Fragment>;

						return <AdminProductItem key={productid} data={item} />;
					})
				) : (
					<div>không có dữ liệu</div>
				)}
			</InfiniteScroll>
		</div>
	);
});

const AdminProductPageHeader = memo(() => {
	const [hideCreateProduct, setHideCreateProduct] = useState(true);
	const dispatch = useDispatch();
	return (
		<div className={cx('h-full flex items-center  bg-violet-400')}>
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
			<div className={cx('')}>
				<Search
					delay={400}
					placeholder="tìm kiếm tên sản phẩm"
					onSearchChange={key => {
						dispatch(setSearchValue({searchKey: key}));
					}}
				/>
			</div>
		</div>
	);
});

export {
	AdminProductEdit,
	AdminProductCreate,
	AdminProductItem,
	AdminProductPageHeader,
	AdminProductList,
};
