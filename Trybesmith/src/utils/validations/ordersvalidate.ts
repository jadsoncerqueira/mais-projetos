import { orders } from './schema';
import Order from '../../interfaces/order.interface';

const ValidateOrders = (arr: Order): string | null => {
  const { error } = orders.validate(arr);
  if (error) return error.message;
  return null;
};

export default ValidateOrders;