## Intro

This is a primer for how multi-threading works in Node. I wrote this as a learning experiment and then I wrote some helper functions and interfaces around the operations to make it useful for porting into my other projects using node and typescript.

The reason I went looking into this is that multi-threading using worker threads can allow one to perform long-running operations while gracefully awaiting those ops in node without stalling all other operations on the main node process. This lets node's single threaded architecture gracefully jump between our worker thread and other web requests efficiently instead of just sitting on the long running process forever until it's done.

## Getting Started

```
npm install
npm run start
```

NOTE: was built using node `v14.18.1` and npm `v8.0.0`.

## Using the app

A couple of useful end points to test out the functionality.

### http://localhost:7000/hello

Will spin up a thread to say hello, wait for its result, and the result will be `Hello, world!`.

### http://localhost:7000/primes

Will spin up a thread to count primes, wait for the its result, and the result will be the primes from 1 to 100.