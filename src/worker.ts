import path from "path";
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

export const getScriptByName = (name: string): string => {
  const workingDir = process.cwd()
  const script = path.join(__dirname, "threaded", `${name}.js`);
  const relativePath = `./${path.relative(workingDir, script)}`;

  return relativePath;
}

export const threadedHello = async () => {
  const script = getScriptByName("hello");
  const result = await startThread(script);
  if (result.type === ThreadedMessageType.Error) {
    throw result.error;
  }

  const data = result.data as string;
  return data;
}

export const threadedPrimes = async (n: number) => {
  const script = getScriptByName("primes");
  const result = await startThread(script, { n });
  if (result.type === ThreadedMessageType.Error) {
    throw result.error;
  }

  const primes = result.data as number[];
  return primes;
}