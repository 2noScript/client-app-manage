import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import {memo} from 'react';
import Banner from './Banner';
const cx = classNames.bind(styles);
function Home() {
	return (
		<div className={cx('bg-slate-400 pt-16', 'wrapper')}>
			<Banner />
		</div>
	);
}

export default memo(Home);
