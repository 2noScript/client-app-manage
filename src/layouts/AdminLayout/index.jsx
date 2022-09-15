import classNames from 'classnames/bind';
import {memo} from 'react';
import {AdminHeader, AdminNavBar, AdminLogout} from './components';
const cx = classNames.bind();
function AdminLayout({children}) {
	return (
		<div>
			<div className={cx('fixed top-0 left-0 pl-40 h-16 w-full z-40 bg-red-400')}>
				<AdminHeader />
			</div>
			<div
				className={cx(
					'flex flex-col fixed top-0 left-0 w-40 bg-slate-200 h-screen',
					'pt-0 z-50'
				)}>
				<div className={cx('h-16 flex items-center justify-center ')}>
					<AdminLogout />
				</div>

				<AdminNavBar className={cx('')} />
			</div>
			<div className={cx('ml-40 mt-16')}>{children}</div>
		</div>
	);
}

export default memo(AdminLayout);
