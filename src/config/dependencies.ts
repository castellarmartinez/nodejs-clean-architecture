import useCases from "../useCases";
import {
  UserRepository,
  ProductRepository,
  OrderRepository,
} from "../frameworks/repositories/inMemory";

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

export default {
  useCases,
  userRepository,
  productRepository,
  orderRepository,
};
