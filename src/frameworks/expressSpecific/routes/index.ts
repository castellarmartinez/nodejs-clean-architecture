import express from "express";
import usersRouter from "./users";
import { Dependencies } from "../../../dependencies";

export function routes(dependencies: Dependencies) {
  const router = express.Router();
  const users = usersRouter(dependencies);

  router.use("/users", users);

  return router;
}
