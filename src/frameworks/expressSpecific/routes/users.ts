import express from "express";
import { userControllers } from "../../../controllers";

export default (dependencies: any) => {
  const router = express.Router();
  const { addUser, getUserById, updateUser, deleteUser } =
    userControllers(dependencies);

    router.route("./").post(addUser).delete(deleteUser).put(updateUser);
    router.route("./:id").get(getUserById);

    return router;
};
