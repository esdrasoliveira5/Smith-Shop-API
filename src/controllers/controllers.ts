import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { OrderProducts } from '../Interface/OrderInterface';
import { ProductInterface } from '../Interface/ProductInterface';
import { UserInterface } from '../Interface/UserInterface';
import services from '../services/services';

const getHealth = async (req: Request, res: Response) => res.status(200).json({
  message: 'Api Online!!',
});

const createUser = async (req: Request, res: Response) => {
  const { username, classe, level, password } :UserInterface = req.body;

  const { status, response } = await services.createUser({ username, classe, level, password });
  
  return res.status(status).json(response);
};

const getByName = async (req: Request, res: Response) => {
  const { username, password } :UserInterface = req.body;

  const { status, response } = await services.getByName({ username, password });
  
  return res.status(status).json(response);
};

const createProduct = async (req: Request, res: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { name, amount } :ProductInterface = req.body;

  const { status, response } = await services.createProduct(authorization, { name, amount });
  
  return res.status(status).json(response);
};

const getProducts = async (req: Request, res: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;

  const { status, response } = await services.getProducts(authorization);
  
  return res.status(status).json(response);
};

const createOrder = async (req: Request, res: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { products }: OrderProducts = req.body;

  const { status, response } = await services.createOrder(authorization, products);
  
  return res.status(status).json(response);
};

const getOrderById = async (req: Request<{ id: string }>, res: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;
  const { id } = req.params;

  const { status, response } = await services.getOrderById(authorization, id);
  
  return res.status(status).json(response);
};

const getAllOrders = async (req: Request<{ id: string }>, res: Response) => {
  const { authorization }: IncomingHttpHeaders | undefined = req.headers;

  const { status, response } = await services.getAllOrders(authorization);
  
  return res.status(status).json(response);
};

export default {
  getHealth,
  createUser,
  getByName,
  createProduct,
  getProducts,
  createOrder,
  getOrderById,
  getAllOrders,
};