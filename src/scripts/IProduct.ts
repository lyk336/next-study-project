interface IProduct {
  id: string;
  title: string;
  imagePaths: Array<string>;
  price: number;
  discount: number | null;
  details: string;
  rating: number;
  ratingNumber: number;
  sellerId: string;
}
