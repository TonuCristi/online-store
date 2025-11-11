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

export type SortType = 'name' | 'price-ascending' | 'price-descending';
