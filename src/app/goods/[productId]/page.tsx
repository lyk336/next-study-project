import Price from '@/components/price';
import ProductImages from './_productComponents/productImages';
import { FC } from 'react';
import { notFound } from 'next/navigation';
import { getProductData } from '@/scripts/dbData/getProduct';

interface IProductProps {
  params: { productId: string };
}

const Product: FC<IProductProps> = async ({ params }) => {
  const productData = await getProductData(params.productId);
  if (!productData) {
    notFound();
  }

  return (
    <div className='product__container'>
      <main className='product'>
        <div className='product__about'>
          <ProductImages paths={productData.imagePaths} />
        </div>
        <div className='product__about'>
          <h2 className='product__title'>{productData.productName}</h2>
          <Price originalPriceInCents={productData.priceInCents} priceWithDiscount={productData.discount} />
          {productData.description && (
            <div className='product__description'>
              <p>{productData.description}</p>
            </div>
          )}
          <div className='product__rating-box'>
            <div className='product__rating'>Avarage rating: {productData.rating}</div>
            <div className='product__ratings-number'>Number of ratings: {productData.ratingNumber}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;
