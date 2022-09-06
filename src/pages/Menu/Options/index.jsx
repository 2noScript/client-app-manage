import classNames from 'classnames/bind';
import styles from './Options.module.scss';
const cx = classNames.bind(styles);
function Otions() {
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
					className={cx(
						'w-full text-base placeholder:text-center placeholder:capitalize placeholder:text-sm placeholder:font-medium',
						'bg-transparent'
					)}
				/>
				<button className={cx('', 'clean')}></button>
			</div>
		</div>
	);
}

export default Otions;
