import { Worker } from "worker_threads"

export enum ThreadedMessageType {
  Unknown = 0,
  Message,
  Done,
  Error,
}

export interface ThreadedMessage {
  type: ThreadedMessageType;
  data?: any;
  error?: Error;
}

const startThread = async (script: string, data?: any): Promise<ThreadedMessage> => {
  const worker = new Worker(script, { workerData: data });

  return new Promise<ThreadedMessage>((resolve, reject) => {
    worker.on("message", (msg) => {
      const message = msg as ThreadedMessage;
      if (message && message.type === ThreadedMessageType.Done) {
        resolve(message);
      }
    });
    worker.on("error", (err) => {
      reject({
        type: ThreadedMessageType.Error,
        error: err,
      });
    });
  });
}

export const threadedHello = async () => {
  const result = await startThread("./dist/threaded/hello.js");
  if (result.type === ThreadedMessageType.Error) {
    throw result.error;
  }

  const data = result.data as string;
  return data;
}

export const threadedPrimes = async (n: number) => {
  const result = await startThread("./dist/threaded/primes.js", { n });
  if (result.type === ThreadedMessageType.Error) {
    throw result.error;
  }

  const primes = result.data as number[];
  return primes;
}