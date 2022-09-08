import {memo} from 'react';

import classNames from 'classnames/bind';
import styles from './Admin.module.scss';

const cx = classNames.bind(styles);
function Admin() {
	return <div>this is admin</div>;
}

export default memo(Admin);
