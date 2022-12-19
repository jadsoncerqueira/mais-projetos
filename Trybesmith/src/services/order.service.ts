import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';

class OrderService {
  public model: OrderModel;
  
  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const response = await this.model.getAll();
    return response;
  }

  public async create(arrIds: number[], id: number) {
    const response = await this.model.create(arrIds, id);
    return response;
  }
}

export default OrderService;