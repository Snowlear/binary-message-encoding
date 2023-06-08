import { Message, MessageCodecI } from './message';

export class MessageCodec implements MessageCodecI {
  encode(message: Message): Uint8Array {
    const headerCount = message.headers.size;
    const headerCountBuffer = Buffer.alloc(1);
    headerCountBuffer.writeUInt8(headerCount);

    const headersBuffer = Buffer.concat(
      Array.from(message.headers.entries()).map(([name, value]) => {
        const nameBuffer = Buffer.from(name + '\0', 'ascii');
        const valueBuffer = Buffer.from(value + '\0', 'ascii');
        return Buffer.concat([nameBuffer, valueBuffer]);
      })
    );

    const payloadBuffer = Buffer.from(message.payload);

    return Buffer.concat([headerCountBuffer, headersBuffer, payloadBuffer]);
  }

  decode(data: Uint8Array): Message {
    const buffer = Buffer.from(data);
    let offset = 0;

    const headerCount = buffer.readUInt8(offset);
    offset += 1;

    const headers = new Map<string, string>();
    for (let i = 0; i < headerCount; i++) {
      const nameEndOffset = buffer.indexOf(0, offset);
      const name = buffer.toString('ascii', offset, nameEndOffset);
      offset = nameEndOffset + 1;

      const valueEndOffset = buffer.indexOf(0, offset);
      const value = buffer.toString('ascii', offset, valueEndOffset);
      offset = valueEndOffset + 1;

      headers.set(name, value);
    }

    const payload = buffer.slice(offset);

    return new Message(headers, payload);
  }
}