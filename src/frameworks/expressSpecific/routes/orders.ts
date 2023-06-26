import express from "express";
import { orderControllers } from "../../../controllers";
import { Dependencies } from "../../../dependencies";

export default (dependencies: Dependencies) => {
  const router = express.Router();
  const { addOrder, getOrderById, updateOrder, deleteOrder } =
    orderControllers(dependencies);

  router.route("/").post(addOrder);
  router.route("/:id").get(getOrderById).delete(updateOrder).put(deleteOrder);

  return router;
};
