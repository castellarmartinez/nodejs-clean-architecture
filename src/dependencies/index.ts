import { ProductRepository, UserRepository, OrderRepository } from "../frameworks/repositories/inMemory";

export interface Dependencies {
  userRepository: UserRepository;
  productRepository: ProductRepository;
  orderRepository: OrderRepository;
}
