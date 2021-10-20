import { isMainThread, parentPort } from "worker_threads";
import { ThreadedMessage, ThreadedMessageType } from "../worker";

const run = () => {
  if (isMainThread) {
    return;
  }

  const result: ThreadedMessage = {
    type: ThreadedMessageType.Done,
    data: "Hello, world!",
  }
  parentPort?.postMessage(result);
}

run();