import { isMainThread, parentPort } from "worker_threads";
import { ThreadedMessage, ThreadedMessageType } from "../worker";

interface Args {
  n: number;
}

const isPrime = (num: number) => {
  if (num <= 1) {
    return true;
  }

  for (let n = num - 1; n > 1; n--) {
    if (num % n === 0) {
      return false;
    }
  }

  return true;
}

const run = (n: number) => {
  if (isMainThread) {
    return;
  }  

  const primes: number[] = [];

  for (let i = 1; i <= n; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  const result: ThreadedMessage = {
    type: ThreadedMessageType.Done,
    data: primes,
  }
  parentPort?.postMessage(result);
}

const args = require("worker_threads").workerData as Args;
run(args.n);