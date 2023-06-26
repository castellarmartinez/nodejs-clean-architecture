import express from "express";
import usersRouter from "./users";
import productsRouter from "./products";
import ordersRouter from "./orders";
import { Dependencies } from "../../../dependencies";

export function routes(dependencies: Dependencies) {
  const router = express.Router();
  const users = usersRouter(dependencies);
  const products = productsRouter(dependencies);
  const orders = ordersRouter(dependencies);

  router.use("/users", users);
  router.use("/products", products);
  router.use("/orders", orders);

  return router;
}
