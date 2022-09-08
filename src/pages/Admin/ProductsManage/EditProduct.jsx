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
						token: 'abcd',
					},
				});
				alert('xóa thành công');
			} catch {
				alert('err');
			}
		};
		deleteProduct();
	}, [id]);
	const handleUpdate = useCallback(() => {}, [
		id,
		name,
		price,
		description,
		discount,
		status,
		imageLink,
	]);
	return (
		<div className={cx('flex flex-col')}>
			<div>
				<div className={cx('')}>
					<div className={cx('w-80')}>id</div>
					<input
						type="text"
						value={id}
						className={cx('w-96')}
						onChange={e => {
							setId(e.target.value);
						}}
					/>
				</div>
				<div>
					<div>status</div>
					<input
						type="text"
						value={status}
						className={cx('w-96')}
						onChange={e => {
							setStatus(e.target.value);
						}}
					/>
				</div>
				<div>
					<div>name</div>
					<input
						type="text"
						value={name}
						className={cx('w-96')}
						onChange={e => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div>
					<div>price</div>
					<input
						type="text"
						value={price}
						className={cx('w-96')}
						onChange={e => {
							setPrice(e.target.value);
						}}
					/>
				</div>
				<div>
					<div>discount</div>
					<input
						type="text"
						value={discount}
						className={cx('w-96')}
						onChange={e => {
							setDiscount(e.target.value);
						}}
					/>
				</div>
				<div>
					<div>description</div>
					<textarea
						type="text"
						value={description}
						className={cx('w-96')}
						onChange={e => {
							setDescription(e.target.value);
						}}
					/>
				</div>
				<div>
					<div>imagelink</div>
					<textarea
						type="text"
						value={imageLink}
						className={cx('w-96')}
						onChange={e => {
							setImageLink(e.target.value);
						}}
					/>
				</div>
			</div>
			<div>
				<button className={cx('px-2')}>update</button>
				<button className={cx('px-2')} onClick={handleDelete}>
					delete
				</button>
			</div>
		</div>
	);
}

export default memo(EditProduct);
