//lesson2 События в Node.js

//import module's of events

const EventEmitter = require("events");

//crearing our self emmitter
const emitter = new EventEmitter();

//creating an array of objects with requests
const requestTypes = [
  { type: "send", payload: "to send a document" },
  { type: "receive", payload: "to receive a document" },
  { type: "sign", payload: "to sign a document" },
];

//creating a class of new visitor
class Customer {
  constructor({ type, payload }) {
    this.type = type;
    this.payload = payload;
  }
}

//creating a function to generate random numbers
const generateIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//creating a function to generate coming a new visitor
const generateNewCustomer = () => {
  const params = requestTypes[generateIntInRange(0, requestTypes.length - 1)];

  return new Customer(params);
};

//creating a delay when a new visitor appears
const run = async () => {
  const customer = generateNewCustomer();

  emitter.emit(customer.type, customer.payload);

  await new Promise((resolve) => {
    setTimeout(resolve, generateIntInRange(1000, 5000));
  });
  await run();
};

//creating a class to function of handlers for requests
class Handler {
  static send(payload) {
    console.log("Send request:", payload);
  }
  static receive(payload) {
    console.log("Receive request:", payload);
  }
  static sign(payload) {
    console.log("Sign request:", payload);
  }
  static pay(payload) {
    console.log("Pay request:", payload);
  }
}

//connecting listeners
emitter.on("send", Handler.send);
emitter.on("send", Handler.pay);
emitter.on("receive", Handler.receive);

emitter.once("sign", () => {
  emitter.emit("error", "Broken pen!");
});
emitter.on("sign", Handler.sign);
emitter.on("error", (err) => {
  console.log(err);
});

run();

// emitter.on("test", (payload) => {
//   console.log(`this is test!  ${payload}`);
// });
// emitter.emit("test", "and payload");
