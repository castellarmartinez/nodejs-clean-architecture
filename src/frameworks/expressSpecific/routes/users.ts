import express from "express";
import { userControllers } from "../../../controllers";
import { Dependencies } from "../../../dependencies";

export default (dependencies: Dependencies) => {
  const router = express.Router();
  const { addUser, getUserById, updateUser, deleteUser } =
    userControllers(dependencies);

  router.route("/").post(addUser).put(updateUser);
  router.route("/:id").get(getUserById).delete(deleteUser);

  return router;
};
