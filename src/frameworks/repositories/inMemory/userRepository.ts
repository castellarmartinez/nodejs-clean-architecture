import { inMemory as inMemoryDB } from "../../database";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../entities";

export class UserRepository {
  async add(user: User): Promise<User> {
    if (!user.id) {
      user.id = uuidv4();
    }

    inMemoryDB.users.push(user);

    return user;
  }

  async update(updatedUser: User): Promise<User | null> {
    const index = inMemoryDB.users.findIndex(
      (user) => user.id === updatedUser.id
    );

    if (index >= 0) {
      inMemoryDB.users[index] = updatedUser;
      return inMemoryDB.users[index];
    }

    return null;
  }

  async remove(userToRemove: User): Promise<User[] | null> {
    const index = inMemoryDB.users.findIndex(
      (user) => user.id === userToRemove.id
    );

    if (index >= 0) {
      inMemoryDB.users.splice(index, 1);

      return inMemoryDB.users;
    }

    return null;
  }

  async getById(id: string): Promise<User | undefined> {
    return inMemoryDB.users.find((user) => user.id === id);
  }
}
