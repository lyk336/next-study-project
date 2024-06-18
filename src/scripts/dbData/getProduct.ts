'use server';

import { unstable_cache } from 'next/cache';
import db from '@/db/db';

export const getProductData = unstable_cache(
  async (productId) => {
    const item = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    return item;
  },
  ['product-data'],
  { revalidate: 10 }
);
