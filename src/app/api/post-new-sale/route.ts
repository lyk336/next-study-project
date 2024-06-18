import { imagesSchema } from '@/scripts/validationSchemaForSale';
import { z } from 'zod';
import fs from 'fs/promises';
import db from '@/db/db';
import path from 'path';

interface IProductProps {
  productName: string;
  imagePaths: Array<string>;
  priceInCents: number;
  description: string;
  sellerId: string;
}
class PostData {
  public productName: string;
  public imagePaths: Array<string>;
  public priceInCents: number;
  public discount: null | number = null;
  public description: string;
  public rating: number = 0;
  public ratingNumber: number = 0;
  public sellerId: string;

  constructor({ productName, imagePaths, priceInCents, description, sellerId }: IProductProps) {
    this.productName = productName;
    this.imagePaths = imagePaths;
    this.priceInCents = priceInCents;
    this.description = description;
    this.sellerId = sellerId;
  }
}

const requestSchema = z.object({
  productName: z.string().min(1).max(60),
  price: z.coerce.number().min(0.01),
  images: imagesSchema,
  description: z.string().max(200),
  sellerId: z.string().min(1),
});

export async function POST(request: Request) {
  const requestData: FormData = await request.formData();
  const formData = {
    productName: requestData.get('productName')?.toString(),
    price: parseFloat(requestData.get('price')?.toString() || '0'),
    images: requestData.getAll('images'),
    description: requestData.get('description')?.toString(),
    sellerId: requestData.get('sellerId')?.toString(),
  };

  const result = requestSchema.safeParse(formData);
  if (!result.success) {
    return new Response('Bad Request', { status: 400 });
  }

  const data = result.data;
  const filePaths: Array<string> = [];
  for (const file of data.images) {
    await fs.mkdir('image-bucket', { recursive: true });
    const extName = path.extname(file.name);
    const filePath: string = `${crypto.randomUUID()}${extName}`;
    filePaths.push(filePath);
    await fs.writeFile(`image-bucket/${filePath}`, Buffer.from(await file.arrayBuffer()));
  }
  const productProps: IProductProps = {
    productName: data.productName,
    imagePaths: filePaths,
    priceInCents: data.price * 100,
    description: data.description,
    sellerId: data.sellerId,
  };
  const ProductData: PostData = new PostData(productProps);

  await db.product.create({ data: ProductData });
  return new Response('Posted', { status: 201 });
}
