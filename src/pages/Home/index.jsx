import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);
function Home() {
	return <div className={cx('bg-slate-400 pt-16', 'wrapper')}>this is home</div>;
}

export default Home;
