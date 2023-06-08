# Binary Message Encoding Scheme

This is a simple binary message encoding scheme designed for a signaling protocol used in a real-time communication application. It allows for the exchange of messages between peers, consisting of headers (name-value pairs) and a binary payload.

## Usage

To use the binary message encoding scheme:

1. Clone the repository and navigate to the project directory.
2. Install the dependencies by running `npm install`.
3. Modify `index.ts` to create and encode/decode your own messages.
4. Run the application with the command `node index.ts`.
5. Check the console output for the encoded data and decoded message.

## Message Model

A message can contain a variable number of headers and a binary payload. The headers are name-value pairs, where both names and values are ASCII-encoded strings. Header names and values are limited to 1023 bytes (independently). A message can have a maximum of 63 headers. The message payload is limited to 256 KiB.

## API

The API consists of two main components: the `Message` class and the `MessageCodec` interface.

### Message

The `Message` class represents a message with headers and a payload. It has two properties: `headers`, which is a Map of string keys and string values, and `payload`, which is a byte array.

```typescript
class Message {
  headers: Map<string, string>;
  payload: Uint8Array;

  constructor(headers: Map<string, string>, payload: Uint8Array) {
    this.headers = headers;
    this.payload = payload;
  }
}