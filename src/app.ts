import express from "express";
import "dotenv/config";

import { routes } from "./frameworks/expressSpecific/routes";
import dependencies from "./config/dependencies";
import errorHandler from "./frameworks/expressSpecific/errorHandler";
import "./frameworks/database/mongo";

const app = express();
const PORT = Number(process.env.PORT);
const API_PREFIX = String(process.env.API_PREFIX);

export default {
  start() {
    app.use(express.json());
    app.use(express.urlencoded());

    app.use(API_PREFIX, routes(dependencies));
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server up and running on port ${PORT}!`);
    });
  },
};
