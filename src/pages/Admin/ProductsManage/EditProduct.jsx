import {memo, useState, useCallback} from 'react';
import classNames from 'classnames/bind';
import {MdClose} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {fetchProductsList} from '../../../store/productsReducer';
import api from '../../../api';
const cx = classNames.bind();
function EditProduct({data, onClose}) {
	const [name, setName] = useState(data.productname);
	const [id, setId] = useState(data.productid);
	const [price, setPrice] = useState(data.productprice);
	const [description, setDescription] = useState(data.description);
	const [discount, setDiscount] = useState(data.discount);
	const [status, setStatus] = useState(data.itemstatus);
	const [imageLink, setImageLink] = useState(data.imagelink);

	const dispatch = useDispatch();
	const handleDelete = useCallback(() => {
		const deleteProduct = async () => {
			try {
				await api.delete(`products/${id}/`, {
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
	}, [id]);

	const handleUpdate = useCallback(() => {
		const data = {
			productname: name,
			productid: id,
			productidold: id,
			productprice: price,
			description: description,
			discount: discount,
			imagelink: imageLink,
			itemstatus: status,
		};
		const updateProduct = async () => {
			try {
				await api.put(
					'products',
					{
						...data,
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
		console.log(typeof status);
		if (
			name &&
			id &&
			price &&
			description &&
			discount &&
			status.toString().length > 0 &&
			imageLink
		)
			updateProduct();
		else {
			alert('thông tin không được bỏ trống');
		}
	}, [id, name, price, description, discount, status, imageLink]);
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
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>id</div>
						<div className={cx('bg-white px-2 rounded')}>{id}</div>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>status</div>
						<input
							type="text"
							value={status}
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							onChange={e => {
								setStatus(e.target.value);
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>name</div>
						<input
							type="text"
							value={name}
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							onChange={e => {
								setName(e.target.value);
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>price</div>
						<input
							type="text"
							value={price}
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							onChange={e => {
								setPrice(e.target.value);
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold')}>discount</div>
						<input
							type="text"
							value={discount}
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							onChange={e => {
								setDiscount(e.target.value);
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold ')}>description</div>
						<textarea
							type="text"
							value={description}
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							onChange={e => {
								setDescription(e.target.value);
							}}
						/>
					</div>
					<div className={cx('flex items-center mt-1 bg-slate-300')}>
						<div className={cx('w-24 px-2 capitalize  font-semibold ')}>imagelink</div>
						<textarea
							type="text"
							value={imageLink}
							className={cx('w-96 rounded-sm px-1 bg-slate-200')}
							onChange={e => {
								setImageLink(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className={cx('mt-4 flex items-center justify-center mb-2')}>
					<button
						className={cx('px-2  bg-yellow-200 rounded capitalize font-semibold')}
						onClick={handleUpdate}>
						update
					</button>
					<button
						className={cx('px-2  bg-yellow-200 rounded capitalize ml-2 font-semibold')}
						onClick={handleDelete}>
						delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default memo(EditProduct);
