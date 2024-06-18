import Link from 'next/link';
import { FC } from 'react';
import GoodsList from './_goodsComponents/goodsList';
import Image from 'next/image';
import Price from '@/components/price';
import { getProductList } from '@/scripts/dbData/getProductList';

export const revalidate = 10;

interface IGoodsProps {}

const Goods: FC<IGoodsProps> = async () => {
  const goods = await getProductList();

  return (
    <div className='goods__container'>
      <aside className='filters'>
        <h2 className='filters__title'>Apply filters</h2>
        <ul className='filters__list'></ul>
      </aside>
      <main className='goods'>
        <GoodsList>
          {goods.map((product) => (
            <li className='goods__product product' key={product.id}>
              <Link href={`/goods/${product.id}`}>
                <Image
                  src={`/api/product/${product.imagePaths[0]}`}
                  alt=''
                  className='product__thumbnail'
                  width={240}
                  height={240}
                />
                <h2 className='product__title'>{product.productName}</h2>
                <Price originalPriceInCents={product.priceInCents} priceWithDiscount={product.discount} />
                <p className='product__description'>{product.description}</p>
              </Link>
            </li>
          ))}
        </GoodsList>
      </main>
    </div>
  );
};

export default Goods;
