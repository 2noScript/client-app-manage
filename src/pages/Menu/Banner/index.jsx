import {memo} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper';
import {Link} from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
const cx = classNames.bind(styles);
function Banner({data}) {
	const _data = [
		{
			id: 1,
			url: 'https://img.freepik.com/premium-photo/tasty-espresso-served-cup-with-coffee-beans-around-spoon-view-from-dark-background-banner_1220-5751.jpg?w=2000',
		},
		{
			id: 2,
			url: 'https://t4.ftcdn.net/jpg/02/57/19/97/360_F_257199717_Xy7L8AG3k25iyrgCLZzKiNhlHmSmAtzY.jpg',
		},
		{
			id: 3,
			url: 'https://i.pinimg.com/originals/04/9c/f2/049cf2569d3f2e49feb3d3adbd87e91d.jpg',
		},
	];
	return (
		<Swiper
			className={cx('wrapper')}
			spaceBetween={0}
			slidesPerView={1}
			loop={true}
			pagination={{
				clickable: true,
			}}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
			}}
			modules={[Pagination, Autoplay]}>
			{_data &&
				_data?.map(item => {
					if (item.id > 0)
						return (
							<SwiperSlide key={item.id} className={cx('slide-item')}>
								<Link to={'#'}>
									<img
										src={item.url}
										width={'100%'}
										alt="..."
										className={cx('h-80 rounded-lg')}
									/>
								</Link>
							</SwiperSlide>
						);
				})}
		</Swiper>
	);
}

export default memo(Banner);
