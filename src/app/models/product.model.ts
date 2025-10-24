export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  sku: string;
  image_url: string;
  is_active: boolean;
}
