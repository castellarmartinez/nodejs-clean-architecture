import {
  UserRepository,
  ProductRepository,
  OrderRepository,
} from "../frameworks/repositories/mongo";

const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

export default {
  userRepository,
  productRepository,
  orderRepository,
};
