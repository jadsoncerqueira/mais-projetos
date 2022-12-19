import { products } from './schema';
import Product from '../../interfaces/product.interface';

const ValidateProducts = (obj: Product): string | null => {
  const { error } = products.validate(obj);
  if (error) return error.message;
  return null;
};

export default ValidateProducts;