import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

export function start() {
  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}!`);
  });
}
