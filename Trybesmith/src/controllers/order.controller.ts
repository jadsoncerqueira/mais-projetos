import { Request, Response } from 'express';
import statusCodes from '../../statusCodes';
import OrderService from '../services/order.service';
import ValidateOrders from '../utils/validations/ordersvalidate';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.orderService.getAll();
    res.status(statusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds, user } = req.body;

    const val = ValidateOrders(productsIds);
    const aux = !productsIds ? [] : productsIds;
    if (!productsIds) {
      return res.status(statusCodes.BAD_REQUEST)
        .json({ message: '"productsIds" is required' });
    }
    if (aux.length === 0) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: '"productsIds" must include only numbers' });
    }
    if (val) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: val.replace('value', 'productsIds') });
    }
    const response = await this.orderService.create(productsIds, user.id);
    res.status(statusCodes.CREATED).json(response);
  };
}

export default OrderController;