import express from "express";
import { orderControllers, middlewares } from "../../../controllers";
import { Dependencies } from "../../../dependencies";

export default (dependencies: Dependencies) => {
  const router = express.Router();
  const { validateUser, validateProducts } = middlewares(dependencies);
  const { addOrder, getOrderById, updateOrder, deleteOrder } =
    orderControllers(dependencies);

  router.route("/").post(validateUser, validateProducts, addOrder);
  router.route("/:id").get(getOrderById).delete(deleteOrder).put(updateOrder);

  return router;
};
