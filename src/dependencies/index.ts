import { UserRepository } from "../frameworks/repositories/inMemory";

export interface Dependencies {
  userRepository: UserRepository;
}
