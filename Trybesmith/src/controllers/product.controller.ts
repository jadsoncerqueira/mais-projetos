import { Request, Response } from 'express';
import statusCodes from '../../statusCodes';
import ProductsService from '../services/products.service';

class ProductsController {
  constructor(private productService = new ProductsService()) {}

  public create = async (req: Request, res: Response) => {
    const productCreated = await this.productService.create(req.body);
    if (productCreated.type) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: productCreated.message });
    }
    return res.status(statusCodes.CREATED).json(productCreated.message);
  };

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  };
}

export default ProductsController;
