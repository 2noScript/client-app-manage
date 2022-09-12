import classNames from 'classnames/bind';
import api from '../../../api';
import {useCallback, memo, useState} from 'react';
import {MdClose} from 'react-icons/md';
const cx = classNames.bind();
function CreateProduct({onClick}) {
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
							Authorization: localStorage.getItem('accessToken'),
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
					onClick={onClick}
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
							value={name}
							onChange={e => {
								setName(e.target.value);
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
							value={id}
							onChange={e => {
								setId(e.target.value);
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
						value={descripttion}
						onChange={e => {
							setDescripttion(e.target.value);
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
						value={imageLink}
						onChange={e => {
							setImageLink(e.target.value);
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
							value={price}
							onChange={e => {
								setPrice(e.target.value);
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
							value={discount}
							onChange={e => {
								setDiscount(e.target.value);
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
							value={status}
							onChange={e => {
								setStatus(e.target.value);
							}}
						/>
					</div>

					<button
						className={cx('px-2  rounded bg-slate-500 mt-2 w-24 py-1  grow')}
						onClick={createProduct}>
						khởi tạo
					</button>
				</div>
			</div>
		</div>
	);
}

export default memo(CreateProduct);
