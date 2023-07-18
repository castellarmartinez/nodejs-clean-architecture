import {
  UserRepository,
  ProductRepository,
  OrderRepository,
} from "../frameworks/repositories/mongo";

export interface Dependencies {
  userRepository: UserRepository;
  productRepository: ProductRepository;
  orderRepository: OrderRepository;
}
