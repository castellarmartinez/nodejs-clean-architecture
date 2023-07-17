import { OrderRepository } from "../frameworks/repositories/inMemory";

import {
  UserRepository,
  ProductRepository,
} from "../frameworks/repositories/mongo";

export interface Dependencies {
  userRepository: UserRepository;
  productRepository: ProductRepository;
  orderRepository: OrderRepository;
}
