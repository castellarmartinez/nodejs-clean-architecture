import useCases from "../useCases";
import {
  ProductRepository,
  OrderRepository,
} from "../frameworks/repositories/inMemory";

import { UserRepository } from "../frameworks/repositories/mongo";

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

export default {
  useCases,
  userRepository,
  productRepository,
  orderRepository,
};
