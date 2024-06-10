'use server';

import { z } from 'zod';
import fs from 'fs/promises';

const fileSchema = z.instanceof(File, { message: 'Required' });
const imageSchema = fileSchema.refine((file) => file.size === 0 || file.type.startsWith('image/'));

const addSchema = z.object({
  image: imageSchema.refine((file) => file.size > 0, 'Required'),
});

export async function saveFile(formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log(data);
  await fs.mkdir('public/images', { recursive: true });
  const filePath: string = `public/images/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.image.arrayBuffer()));
}
