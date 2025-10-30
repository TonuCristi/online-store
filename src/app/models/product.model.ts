export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  sku: string;
  image_url: string;
  is_active: boolean;
  category_id: string;
  user_id: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  sku: string;
  imageUrl: string;
  isActive: boolean;
  categoryId: string;
  userId: string;
}
