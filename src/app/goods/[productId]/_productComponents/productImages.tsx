import Image from 'next/image';
import { FC } from 'react';

interface IProductImagesProps {
  paths: Array<string>;
}

const ProductImages: FC<IProductImagesProps> = ({ paths }) => {
  return (
    <div className='product__images'>
      <div className='product__active-image'>
        <Image src={`${paths[0]}`} alt='' width={600} height={400} />
      </div>
      <ul className='product__image-list'>
        {paths.map((path: string) => (
          <li className='product__image' key={Math.random()}>
            <Image src={`${path}`} alt='' width={90} height={60} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductImages;
