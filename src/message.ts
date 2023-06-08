export class Message {
    headers: Map<string, string>;
    payload: Uint8Array;
  
    constructor(headers: Map<string, string>, payload: Uint8Array) {
      this.headers = headers;
      this.payload = payload;
    }
  }
  
  export interface MessageCodecI {
    encode(message: Message): Uint8Array;
    decode(data: Uint8Array): Message;
  }