import Footer from '../../components/Footer';

import {MenuHeader} from './components';
import classNames from 'classnames/bind';
// import {MenuBanner} from '../../pages/Menu/components';

const cx = classNames.bind();
function MenuLayout({children}) {
	return (
		<>
			<MenuHeader className={cx('h-16 bg-slate-500')} />

			<div className={cx('mt-16')}>{children}</div>
			<Footer />
		</>
	);
}

export default MenuLayout;
