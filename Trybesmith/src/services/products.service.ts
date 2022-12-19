import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import Product from '../interfaces/product.interface';
import ValidateProducts from '../utils/validations/productsvalidate';
import Res from '../interfaces/types.interface';

class ProductsService {
  public model: ProductsModel;
  
  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async create(product: Product): Promise<Res> {
    const val = ValidateProducts(product);
    if (val) return { type: 'error', message: val };
    const response = await this.model.create(product);
    return { type: null, message: response };
  }

  public async getAll(): Promise<Product[]> {
    const response = await this.model.gelAll();
    return response;
  }
}

export default ProductsService;
