import classNames from 'classnames/bind';
import {memo} from 'react';
const cx = classNames.bind();

function EndMessage() {
	return (
		<div className={cx('fixed bottom-0  z-50  flex justify-center ')}>
			<b>Yay! You have seen it all</b>
		</div>
	);
}

export default memo(EndMessage);
