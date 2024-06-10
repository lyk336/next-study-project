import { z } from 'zod';

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0 && file.type.startsWith('image/'), 'You can upload only images');
export const imagesSchema = z
  .array(imageSchema)
  .nonempty('You must upload at least 1 file')
  .max(10, 'You cannot upload more than 10 files');

export const validationSchema = z.object({
  productName: z.string().min(1, 'Required').max(60, 'Max 60 characters'),
  price: z.coerce.number().min(0.01, 'Must be greater than 1 cent').max(1000000),
  images: imagesSchema,
  description: z.string().max(200, 'Max 200 characters'),
});
