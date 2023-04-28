import express from "express";

const app = express();
const localPort = 3000;
const PORT = Number(process.env.PORT) || localPort;

export function start() {
  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}!`);
  });
}
