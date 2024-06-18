import fs from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: { imageName: string } }) {
  const { imageName } = params;

  const imagePath = path.join(process.cwd(), 'image-bucket', imageName);

  try {
    const data = await fs.promises.readFile(imagePath);
    const extName = path.extname(imagePath).substring(1);

    return new Response(data, {
      headers: { 'Content-Type': `image/${extName}` },
    });
  } catch (err) {
    console.error('Image with this name do not exists');
    return new Response(null, {
      status: 500,
    });
  }
}
