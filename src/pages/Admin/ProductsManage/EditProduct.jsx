import {memo, useState, useCallback} from 'react';
import classNames from 'classnames/bind';
import api from '../../../api';
const cx = classNames.bind();
function EditProduct({data}) {
	// const {
	// 	productid,
	// 	productname,
	// 	productprice,
	// 	itemstatus,
	// 	discount,
	// 	description,
	// 	imagelink,
	// } = data;

	const [name, setName] = useState(data.productname);
	const [id, setId] = useState(data.productid);
	const [price, setPrice] = useState(data.productprice);
	const [description, setDescription] = useState(data.description);
	const [discount, setDiscount] = useState(data.discount);
	const [status, setStatus] = useState(data.itemstatus);
	const [imageLink, setImageLink] = useState(data.imagelink);
	const handleDelete = useCallback(() => {
		const deleteProduct = async () => {
			try {
				await api.delete(`products/${id}/`, {
					params: {
						token: localStorage.getItem('accessToken'),
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
						token: localStorage.getItem('accessToken'),
						...data,
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				alert('chỉnh sửa thành công');
				window.location.reload();
			} catch {
				alert('chỉnh sửa ko thành công');
			}
		};
		if (name && id && price && description && discount && status && imageLink)
			updateProduct();
		else {
			alert('thông tin không được bỏ trống');
		}
	}, [id, name, price, description, discount, status, imageLink]);
	return (
		<div className={cx('flex flex-col bg-slate-500 px-4 py-4 rounded-2xl')}>
			<div>
				<div className={cx('flex items-center')}>
					<div className={cx('w-24 px-2 capitalize text-white font-semibold')}>id</div>
					<div className={cx('bg-white px-2 rounded')}>{id}</div>
				</div>
				<div className={cx('flex items-center mt-1')}>
					<div className={cx('w-24 px-2 capitalize text-white font-semibold')}>
						status
					</div>
					<input
						type="text"
						value={status}
						className={cx('w-96 rounded-sm px-1')}
						onChange={e => {
							setStatus(e.target.value);
						}}
					/>
				</div>
				<div className={cx('flex items-center mt-1')}>
					<div className={cx('w-24 px-2 capitalize text-white font-semibold')}>name</div>
					<input
						type="text"
						value={name}
						className={cx('w-96 rounded-sm px-1')}
						onChange={e => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div className={cx('flex items-center mt-1')}>
					<div className={cx('w-24 px-2 capitalize text-white font-semibold')}>price</div>
					<input
						type="text"
						value={price}
						className={cx('w-96 rounded-sm px-1')}
						onChange={e => {
							setPrice(e.target.value);
						}}
					/>
				</div>
				<div className={cx('flex items-center mt-1')}>
					<div className={cx('w-24 px-2 capitalize text-white font-semibold')}>
						discount
					</div>
					<input
						type="text"
						value={discount}
						className={cx('w-96 rounded-sm px-1')}
						onChange={e => {
							setDiscount(e.target.value);
						}}
					/>
				</div>
				<div className={cx('flex items-center mt-1')}>
					<div className={cx('w-24 px-2 capitalize text-white font-semibold')}>
						description
					</div>
					<textarea
						type="text"
						value={description}
						className={cx('w-96 rounded-sm px-1')}
						onChange={e => {
							setDescription(e.target.value);
						}}
					/>
				</div>
				<div className={cx('flex items-center mt-1')}>
					<div className={cx('w-24 px-2 capitalize text-white font-semibold')}>
						imagelink
					</div>
					<textarea
						type="text"
						value={imageLink}
						className={cx('w-96 rounded-sm px-1')}
						onChange={e => {
							setImageLink(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className={cx('mt-4')}>
				<button
					className={cx('px-2 text-red-600 bg-yellow-200 rounded capitalize')}
					onClick={handleUpdate}>
					update
				</button>
				<button
					className={cx('px-2 text-red-600 bg-yellow-200 rounded capitalize ml-2')}
					onClick={handleDelete}>
					delete
				</button>
			</div>
		</div>
	);
}

export default memo(EditProduct);
