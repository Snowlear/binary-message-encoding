import { Message } from "./src/message";
import { MessageCodec } from "./src/messageCodec";

const codec = new MessageCodec();

const message = new Message(
  new Map([['Content-Type', 'application/json']]),
  new Uint8Array([123, 34, 107, 101, 121, 34, 58, 34, 118, 97, 108, 117, 101, 34, 125])
);

const encodedMessage = codec.encode(message);
const decodedMessage = codec.decode(encodedMessage);

console.log(decodedMessage.headers); // Map { 'Content-Type' => 'application/json' }
console.log(decodedMessage.payload); // Uint8Array [123, 34, 107, 101, 121, 34, 58, 34, 118, 97, 108, 117, 101, 34, 125]