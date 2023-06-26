import express from "express";
import { productControllers } from "../../../controllers";
import { Dependencies } from "../../../dependencies";

export default (dependencies: Dependencies) => {
  const router = express.Router();
  const { addProduct, getProductById, updateProduct, deleteProduct } =
    productControllers(dependencies);

  router.route("/").post(addProduct);
  router
    .route("/:id")
    .get(getProductById)
    .delete(updateProduct)
    .put(deleteProduct);

  return router;
};
