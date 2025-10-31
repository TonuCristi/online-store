import { Category, CategoryResponse } from '../models/category.model';

export function mapCategory(category: CategoryResponse): Category {
  return category;
}
