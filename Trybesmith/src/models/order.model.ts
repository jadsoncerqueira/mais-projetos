import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `
        SELECT orde.id, orde.userId, JSON_ARRAYAGG(pro.id) productsIds
        FROM Trybesmith.Orders orde
        INNER JOIN Trybesmith.Products pro
        ON orde.id = pro.orderId
        GROUP BY pro.orderId
      `,
    );

    const [rows] = result;
    return rows as Order[];
  }

  public async create(arrIds: number[], id: number) {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [id],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;

    await Promise.all(arrIds.map(async (pId) => {
      await this.connection.execute<ResultSetHeader>(
        'UPDATE Trybesmith.Products SET orderId=? WHERE id=?',
        [insertId, pId],
      );
    }));

    return { userId: id, productsIds: arrIds };
  }
}

export default OrderModel;