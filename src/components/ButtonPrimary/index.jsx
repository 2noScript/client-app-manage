import classNames from 'classnames/bind';
const cx = classNames.bind();

function ButtonPrimary({onClick, text, icon, className}) {
	return (
		<button
			onClick={onClick}
			className={cx('flex items-center  capitalize ', {
				[className]: className,
			})}>
			<div className={cx('text-lg')}>{icon}</div>
			<div className={cx('font-semibold ml-1')}>{text}</div>
		</button>
	);
}

export default ButtonPrimary;
