import { inMemory as inMemoryDB } from "../../database";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../entities";

export async function add(user: User) {
  if (!user.id) {
    user.id = uuidv4();
  }

  inMemoryDB.users.push(user);

  return user;
}

export async function update(user: User) {
  const index = inMemoryDB.users.findIndex((item) => item.id === user.id);

  if (index >= 0) {
    inMemoryDB.users[index] = user;
    return inMemoryDB.users[index];
  }

  return null;
}

export async function remove(user: User) {
  const index = inMemoryDB.users.findIndex((item) => item.id === user.id);
  
  if (index >= 0) {
    inMemoryDB.users.splice(index, 1);

    return inMemoryDB.users;
  }

  return null;
}

export async function getById(id: string) {
  return inMemoryDB.users.find((item) => item.id === id);
}
