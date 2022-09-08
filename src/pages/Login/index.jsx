import {useMemo, memo, useState, useEffect, useCallback} from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import {FaRegUser} from 'react-icons/fa';
import {VscKey} from 'react-icons/vsc';
import {useDispatch} from 'react-redux';
import {reset, isClient, isAdmin} from '../../store/userReducer';
import {useNavigate} from 'react-router-dom';
import api from '../../api';
import {GiWoodenClogs} from 'react-icons/gi';
const cx = classNames.bind(styles);
const u =
	'https://toigingiuvedep.vn/wp-content/uploads/2021/07/mau-menu-quan-cafe-cuc-dep.jpg';

function Login() {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	//handle
	const handleUserNameInput = useCallback(e => {
		setUserName(e.target.value);
	}, []);
	const handlePasswordInput = useCallback(e => {
		setPassword(e.target.value);
	}, []);

	//
	const handleSubmit = useCallback(() => {
		const submit = async () => {
			try {
				const {data} = await api.get('users', {
					params: {
						token: 'abcd',
					},
				});
				const {userList} = data;
				userList.forEach(item => {
					// const {username, role, password, initializationtokentime} = item;
					if (userName === item.username && password === item.password) {
						if (item.role === 'admin') {
							localStorage.setItem('accessToken', true);
							localStorage.setItem('user', 'admin');
							navigate('/admin');
							dispatch(isAdmin());
						} else if (item.role === 'user') {
							dispatch(isClient());
							localStorage.setItem('accessToken', true);
							localStorage.setItem('user', 'client');
							navigate('/menu');
						}
					}
				});
				console.log(userList);
			} catch {
				console.log('await data');
			}
		};
		submit();
	}, [userName, password]);
	return (
		<div
			className={cx('w-screen h-screen bg-cover')}
			style={{backgroundImage: `url(${u})`}}>
			<div
				className={cx(
					'abs-center  backdrop-brightness-50 bg-white/30 flex items-center justify-center',
					'login'
				)}>
				<div className={cx('bg-white h-40 w-72')}>
					<div className={cx('flex items-center')}>
						<div>
							<FaRegUser />
						</div>
						<div>
							<input
								type="text"
								placeholder="tên đăng nhập"
								className={cx('placeholder:text-center')}
								onChange={handleUserNameInput}
								value={userName}
							/>
						</div>
					</div>
					<div className={cx('flex items-center')}>
						<div>
							<VscKey />
						</div>
						<div>
							<input
								type="password"
								value={password}
								placeholder="mật khẩu"
								className={cx('placeholder:text-center')}
								onChange={handlePasswordInput}
							/>
						</div>
					</div>
					<div className={cx('')}>
						<button onClick={handleSubmit}>đăng nhập</button>
						<button
							onClick={() => {
								localStorage.removeItem('accessToken');
							}}>
							đăng xuất
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Login);
