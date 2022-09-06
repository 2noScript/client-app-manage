import classNames from 'classnames/bind';
import styles from './Options.module.scss';
import {useState, useEffect, memo} from 'react';
import {useDebounce} from '@react-hook/debounce';
import {useDispatch} from 'react-redux';
import {fetchProductsList} from '../../../store/productsReducer';
const cx = classNames.bind(styles);
function Otions() {
	const [keyword, setKeyword] = useState('');
	const [value, setValue] = useDebounce('', 1000);
	const dispatch = useDispatch();
	useEffect(() => {
		setValue(keyword);
	}, [keyword]);
	// console.log(value);
	useEffect(() => {
		dispatch(
			fetchProductsList({
				page: 1,
				itemPerPage: 20,
				keyword: value,
			})
		);
	}, [value]);

	return (
		<div className={cx('h-20 flex items-center ')}>
			<div className={cx('w-20')}></div>
			<div
				className={cx(
					'w-64 bg-red-200 px-3 py-1 rounded-3xl border-solid border ',
					'focus-within:border-zinc-700',
					'search'
				)}>
				<input
					type="text"
					placeholder="tìm kiếm"
					value={keyword}
					onChange={e => {
						setKeyword(e.target.value);
					}}
					className={cx(
						'w-full text-base placeholder:text-center placeholder:capitalize placeholder:text-sm placeholder:font-medium',
						'bg-transparent caret-pink-500'
					)}
				/>
				<button className={cx('', 'clean')}></button>
			</div>
		</div>
	);
}

export default memo(Otions);
