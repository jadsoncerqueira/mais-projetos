const conn = require('./conection');

const insert = async (arr) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );

  await Promise.all(
    arr.map(async (element) => {
      await conn.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [insertId, element.productId, element.quantity],
      );
    }),
  );
  return insertId;
};

const findAll = async () => {
  const queryPart1 = 'SELECT sales.id saleId, sales.date, sp.product_id productId, sp.quantity ';
  const queryPart2 = 'FROM StoreManager.sales as sales ';
  const queryPart3 = 'INNER JOIN StoreManager.sales_products AS sp ON sp.sale_id = sales.id';
  const [result] = await conn.execute(
    queryPart1 + queryPart2 + queryPart3,
  );
  return result;
};

const findById = async (id) => {
  const queryPart1 = 'SELECT sales.date, sp.product_id productId, sp.quantity';
  const queryPart2 = 'FROM StoreManager.sales as sales';
  const queryPart3 = 'INNER JOIN StoreManager.sales_products sp ON sp.sale_id = sales.id';
  const [result] = await conn.execute(
    `${queryPart1} ${queryPart2} ${queryPart3} WHERE sales.id = ?`, [id],
  );
  return result;
};

const del = async (id) => {
  await conn.execute(
    'DELETE FROM StoreManager.sales WHERE  id = ?',
    [id],
  );

  await conn.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
};

const update = async (quantity, id, productId) => {
  const [{ affectedRows }] = await conn.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, id, productId],
  );
  return affectedRows;
};

module.exports = {
  insert,
  findAll,
  findById,
  del,
  update,
};