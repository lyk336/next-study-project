import { FC } from 'react';

interface IPriceProps {
  originalPriceInCents: number;
  priceWithDiscount: number | null;
}

const Price: FC<IPriceProps> = ({ originalPriceInCents, priceWithDiscount }) => {
  return (
    <div className='price-box'>
      <span className={`price${priceWithDiscount ? ' crossed' : ''}`}>{originalPriceInCents / 100} &#8372;</span>
      {priceWithDiscount && <span className='price-discount'>{priceWithDiscount} &#8372;</span>}
    </div>
  );
};

export default Price;
