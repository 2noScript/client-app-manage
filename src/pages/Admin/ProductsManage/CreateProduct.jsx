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
		<div className={cx('bg-slate-300')} style={{width: 1000}}>
			<div>tạo mới</div>
			<div className={cx('flex flex-col')}>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={e => {
						setName(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="id"
					value={id}
					onChange={e => {
						setId(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="price"
					value={price}
					onChange={e => {
						setPrice(e.target.value);
					}}
				/>
				<textarea
					cols="4"
					rows="4"
					placeholder="discription"
					value={descripttion}
					onChange={e => {
						setDescripttion(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="discount"
					value={discount}
					onChange={e => {
						setDiscount(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="status"
					value={status}
					onChange={e => {
						setStatus(e.target.value);
					}}
				/>
				<textarea
					name=""
					id=""
					cols="4"
					rows="4"
					placeholder="image link"
					value={imageLink}
					onChange={e => {
						setImageLink(e.target.value);
					}}></textarea>
				<button className={cx('mt-5 bg-red-600')} onClick={createProduct}>
					ok
				</button>
			</div>
		</div>
	);
}

export default memo(CreateProduct);
