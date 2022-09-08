import Product from './Product';
import {memo} from 'react';
function ListProduct({data}) {
	return (
		<>
			{data &&
				data.map(item => {
					//hide fix
					if (!item.productid | item.productid.startsWith('?'))
						return <div key={item.productid}></div>;
					return <Product key={item.productid} data={item} />;
				})}
		</>
	);
}

export default memo(ListProduct);
