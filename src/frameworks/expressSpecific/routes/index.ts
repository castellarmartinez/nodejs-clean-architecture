import express from "express";
import usersRouter from "./users";

export function routes(dependencies: any) {
  const router = express.Router();
  const users = usersRouter(dependencies);

  router.use("/users", users);

  return router;
};
