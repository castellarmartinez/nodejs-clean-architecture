import { ProductRepository, UserRepository } from "../frameworks/repositories/inMemory";

export interface Dependencies {
  userRepository: UserRepository;
  productRepository: ProductRepository;
}
