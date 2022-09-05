import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);
function DefaultLayout({children}) {
	return (
		<>
			{/* <Header /> */}
			<NavBar />
			<div className={cx('pl-20')}>{children}</div>
			<Footer />
		</>
	);
}

export default DefaultLayout;
