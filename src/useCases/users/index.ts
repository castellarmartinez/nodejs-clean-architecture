import { addUser } from "./addUserUseCase";
import { getUserById } from "./getUserByIdUseCase";
import { updateUser } from "./updateUserUseCase";
import { deleteUser } from "./deleteUserUseCase";

export const userUseCase = { addUser, getUserById, updateUser, deleteUser };
