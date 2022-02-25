const { Worker } = require("worker_threads");

const run = (passwordSize) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: passwordSize,
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
};

(async () => {
  try {
    const passwordBytesSize = 4;
    const password = await run(passwordBytesSize);
    console.log(password);
  } catch (error) {
    console.log(error);
  }
})();
