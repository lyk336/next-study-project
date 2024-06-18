import { FC } from 'react';

interface IPriceProps {
  originalPriceInCents: number;
  priceWithDiscount: number | null;
}

const Price: FC<IPriceProps> = ({ originalPriceInCents, priceWithDiscount }) => {
  return (
    <div className='price-box'>
      <span className={`price${priceWithDiscount ? ' crossed' : ''}`}>{originalPriceInCents / 100} $</span>
      {priceWithDiscount && <span className='price-discount'>{priceWithDiscount / 100} $</span>}
    </div>
  );
};

export default Price;
