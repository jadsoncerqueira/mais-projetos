import Product from './product.interface';

export default interface Res {
  type: string | null;
  message: string | Product;
} 