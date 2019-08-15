export interface ProductInterface {
  id?: number;
  img?: string;
  text?: string;
  title?: string;
}

export interface ProductReviewInterface {
  id: number;
  product: number;
  created_at: string | Date;
  created_by: {
    email?: string;
    first_name?: string;
    last_name?: string;
    id?: number;
    username: string;
  },
  rate: number;
  text: string;
}

export interface ProductCreateReviewInterface {
  rate: number;
  text: string;
}
