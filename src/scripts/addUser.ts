'use server';

import db from '@/db/db';
import { z } from 'zod';

const addSchema = z.object({
  name: z.string().min(1),
});

export async function addToDb(formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return;
  }

  const data = result.data;
  await db.user.deleteMany();

  const user = await db.user.findMany();
  console.log('user', user);
}
