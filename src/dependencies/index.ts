import {
  ProductRepository,
  OrderRepository,
} from "../frameworks/repositories/inMemory";

import { UserRepository } from "../frameworks/repositories/mongo";

export interface Dependencies {
  userRepository: UserRepository;
  productRepository: ProductRepository;
  orderRepository: OrderRepository;
}
