import {useMemo, memo, useState, useEffect, useCallback} from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import {FaRegUser} from 'react-icons/fa';
import {VscKey} from 'react-icons/vsc';
import {useDispatch} from 'react-redux';
import {reset, isClient, isAdmin} from '../../store/userReducer';
import {useNavigate} from 'react-router-dom';
import api from '../../api';
// import {GiWoodenClogs} from 'react-icons/gi';
import {BiLogInCircle} from 'react-icons/bi';
const cx = classNames.bind(styles);
const u = 'https://wallpaperaccess.com/full/41593.jpg';

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
				const {data} = await api.post(
					'login',
					{
						username: userName,
						password: password,
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				console.log(data);

				if (data.role === '[ROLE_ADMIN]') {
					localStorage.setItem('accessToken', data.token);
					localStorage.setItem('user', 'admin');
					alert('Bạn đăng nhập với quyền admin');
					navigate('/admin');
					dispatch(isAdmin());
				} else if (data.role === '[ROLE_USER]') {
					localStorage.setItem('accessToken', data.token);
					localStorage.setItem('user', 'client');
					alert('Bạn đăng nhập với quyền khách hàng');

					navigate('/menu');
					dispatch(isClient());
				}
			} catch {
				alert('xin lỗi chú ko pass qua');
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
					'abs-center   flex items-center justify-center',
					'login',
					'rounded-3xl'
				)}>
				<div
					className={cx(
						'bg-white/30  py-6 w-72 backdrop-brightness-50',
						'flex flex-col items-center justify-center rounded-xl'
					)}>
					<div className={cx('flex items-center bg-gray-100 rounded-3xl px-2 py-1')}>
						<div>
							<FaRegUser />
						</div>
						<div>
							<input
								type="text"
								placeholder="username"
								className={cx('placeholder:text-center px-2 bg-transparent')}
								onChange={handleUserNameInput}
								value={userName}
							/>
						</div>
					</div>
					<div className={cx('flex items-center mt-2 rounded-3xl px-2 py-1 bg-gray-100')}>
						<div>
							<VscKey />
						</div>
						<div>
							<input
								type="password"
								value={password}
								placeholder="password"
								className={cx('placeholder:text-center px-2 bg-transparent')}
								onChange={handlePasswordInput}
							/>
						</div>
					</div>
					<div className={cx('mt-4')}>
						<button
							onClick={handleSubmit}
							className={cx(
								'bg-red-300 px-3 rounded  py-1 hover:bg-slate-300',
								'flex items-center'
							)}>
							<span className={cx('capitalize')}>login</span>
							<span>
								<BiLogInCircle />
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Login);
