import express from "express";
import { threadedHello, threadedPrimes } from "./worker";

const PORT = 7000;

const run = async () => {
  const app = express();

  app.get("/", (req, res) => {
    res.status(200).send("threading examples");
  });

  app.get("/hello", async (req, res) => {
    const msg = await threadedHello();
    res.status(200).send(msg);
  });

  app.get("/primes", async (req, res) => {
    const primes = await threadedPrimes(100);
    res.status(200).send(primes);
  });

  app.listen(PORT, () => {
    console.log(`listening on ${PORT}...`);
  });
};

run();