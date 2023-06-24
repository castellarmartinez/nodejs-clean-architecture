import express from "express";
import { routes } from "./frameworks/expressSpecific/routes";
import dependencies from "./config/dependencies";

const app = express();
const localPort = 3000;
const PORT = Number(process.env.PORT) || localPort;
const API_PREFIX = String(process.env.API_PREFIX);

export function start() {
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(API_PREFIX, routes(dependencies));

  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}!`);
  });
}
