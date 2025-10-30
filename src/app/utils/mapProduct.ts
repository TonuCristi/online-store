import { ProductResponse } from '../models/product.model';

export function mapProduct(product: ProductResponse) {
  const {
    stock_quantity: stockQuantity,
    image_url: imageUrl,
    is_active: isActive,
    category_id: categoryId,
    user_id: userId,
    ...rest
  } = product;

  return { stockQuantity, imageUrl, isActive, categoryId, userId, ...rest };
}
