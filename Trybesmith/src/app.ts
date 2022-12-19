import express from 'express';
import ProductsRouter from './routes/products.route';
import UserRouter from './routes/user.route';
import OrderRouter from './routes/order.route';

const app = express();

app.use(express.json());

app.use(ProductsRouter);
app.use(UserRouter);
app.use(OrderRouter);

export default app;
