'use server';

import { cache } from 'react';
import db from '@/db/db';

export const getProductList = cache(async () => {
  const items = await db.product.findMany({
    take: 20,
    select: {
      id: true,
      imagePaths: true,
      productName: true,
      priceInCents: true,
      discount: true,
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return items;
});
