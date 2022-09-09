import classNames from 'classnames/bind';
import api from '../../../api';
import {useCallback, memo, useState} from 'react';
const cx = classNames.bind();
function CreateProduct() {
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [price, setPrice] = useState('');
	const [descripttion, setDescripttion] = useState('');
	const [discount, setDiscount] = useState('');
	const [status, setStatus] = useState('');
	const [imageLink, setImageLink] = useState('');
	const createProduct = useCallback(() => {
		const data = {
			productname: name,
			productid: id,
			productprice: price,
			description: descripttion,
			discount: discount,
			imagelink: imageLink,
			itemstatus: status,
		};
		const post = async () => {
			try {
				await api.post(
					'products',
					{
						...data,
						token: localStorage.getItem('accessToken'),
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				alert('create product successfully');
				window.location.reload();
			} catch {
				console.log('err post');
			}
		};
		if (name && id && price && descripttion && discount && status && imageLink) post();
		else {
			alert('thông tin không được bỏ trống');
		}
	}, [name, id, price, descripttion, discount, status, imageLink]);
	return (
		<div className={cx('bg-slate-300')} style={{width: 800}}>
			<div
				className={cx(
					'flex items-center justify-center py-1 font-medium text-lg bg-red-500'
				)}>
				Thêm sản phẩm mới
			</div>
			<div className={cx('flex flex-col px-4 py-4')}>
				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-50 mt-2')}
					style={{
						borderWidth: '1px',
					}}>
					<input
						className={cx('w-full placeholder:capitalize bg-transparent')}
						type="text"
						placeholder="name"
						value={name}
						onChange={e => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-50 mt-2')}
					style={{
						borderWidth: '1px',
					}}>
					<input
						className={cx('w-full placeholder:capitalize bg-transparent')}
						type="text"
						placeholder="id"
						value={id}
						onChange={e => {
							setId(e.target.value);
						}}
					/>
				</div>
				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-50 mt-2')}
					style={{
						borderWidth: '1px',
					}}>
					<input
						className={cx('w-full placeholder:capitalize bg-transparent')}
						type="text"
						placeholder="price"
						value={price}
						onChange={e => {
							setPrice(e.target.value);
						}}
					/>
				</div>
				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-50 mt-2')}
					style={{
						borderWidth: '1px',
					}}>
					<textarea
						className={cx('w-full placeholder:capitalize bg-transparent')}
						cols="4"
						rows="2"
						placeholder="discription"
						value={descripttion}
						onChange={e => {
							setDescripttion(e.target.value);
						}}
					/>
				</div>
				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-50 mt-2')}
					style={{
						borderWidth: '1px',
					}}>
					<input
						className={cx('w-full placeholder:capitalize bg-transparent')}
						type="text"
						placeholder="discount"
						value={discount}
						onChange={e => {
							setDiscount(e.target.value);
						}}
					/>
				</div>
				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-50 mt-2')}
					style={{
						borderWidth: '1px',
					}}>
					<input
						className={cx('w-full placeholder:capitalize bg-transparent')}
						type="text"
						placeholder="status"
						value={status}
						onChange={e => {
							setStatus(e.target.value);
						}}
					/>
				</div>
				<div
					className={cx('px-2 border-slate-100 rounded bg-slate-50 mt-2')}
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
						placeholder="image link"
						value={imageLink}
						onChange={e => {
							setImageLink(e.target.value);
						}}></textarea>
				</div>
				<button className={cx('mt-5 bg-red-600 w-32 py-1')} onClick={createProduct}>
					khởi tạo
				</button>
			</div>
		</div>
	);
}

export default memo(CreateProduct);
