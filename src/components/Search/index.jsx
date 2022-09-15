import classNames from 'classnames/bind';
import {useDebounceCallback} from '@react-hook/debounce';
import {memo, useState, useCallback, useEffect, useRef} from 'react';
import {MdClose} from 'react-icons/md';

const cx = classNames.bind();
function Search({onSearchChange, delay, placeholder, className}) {
	const [searchValue, setSearchValue] = useState('');
	const search = useRef();
	useEffect(() => {
		hanleDelaySearchValue();
	}, [searchValue]);
	const handleOnChange = useCallback(
		e => {
			setSearchValue(e.target.value);
		},
		[searchValue]
	);
	const handleClearSearchValue = useCallback(() => {
		setSearchValue('');
		search.current.focus();
	}, []);

	const hanleDelaySearchValue = useDebounceCallback(() => {
		onSearchChange(searchValue);
	}, delay);

	return (
		<div>
			<div
				className={cx(
					'w-80 bg-red-200 px-3 py-1 rounded-3xl border-solid border ',
					'focus-within:border-zinc-700 flex',
					{
						[className]: className,
					}
				)}>
				<input
					ref={search}
					type="text"
					placeholder={placeholder || '2noScript'}
					value={searchValue}
					onChange={handleOnChange}
					className={cx(
						'w-full text-base placeholder:text-center placeholder:capitalize placeholder:text-sm placeholder:font-medium',
						'bg-transparent caret-pink-500'
					)}
				/>
				{searchValue.length > 0 && (
					<button className={cx('', 'clean')} onClick={handleClearSearchValue}>
						<MdClose />
					</button>
				)}
			</div>
		</div>
	);
}

export default memo(Search);
