'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

enum ListType {
  list = 'list',
  grid = 'grid',
}
interface IGoodsListProps {
  children: React.ReactNode;
}

const GoodsList: FC<IGoodsListProps> = ({ children }) => {
  const [listType, setListType] = useState<ListType>(ListType.grid);
  return (
    <>
      <div className='goods__title-box'>
        <h1 className='goods__title'>All goods</h1>
        <div className='goods__list-types'>
          <button
            className={`goods__grid-button${listType === ListType.grid ? ' active' : ''}`}
            onClick={() => setListType(ListType.grid)}
          >
            <Image src='icons/grid-icon.svg' alt='' width={24} height={24} />
          </button>
          <button
            className={`goods__list-button${listType === ListType.list ? ' active' : ''}`}
            onClick={() => setListType(ListType.list)}
          >
            <Image src='icons/list-icon.svg' alt='' width={24} height={24} />
          </button>
        </div>
      </div>
      <hr />
      <ul className={`goods__${listType}`}>{children}</ul>
    </>
  );
};

export default GoodsList;
