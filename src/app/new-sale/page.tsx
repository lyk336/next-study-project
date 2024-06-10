import { FC } from 'react';
import FormikForm from './_components/formikForm';
import { auth } from '@clerk/nextjs/server';

interface INewSaleProps {}

const NewSale: FC<INewSaleProps> = () => {
  const { userId } = auth();

  return (
    <div className='new-sale__container'>
      <main className='new-sale'>
        <h1 className='new-sale__title'>New sale</h1>
        <FormikForm userId={userId} />
      </main>
    </div>
  );
};

export default NewSale;
