# aedes-crash-with-level

> Sample repo to reproduce crash bug.

## How to reproduce

Start the broker in one console:

```
$ node broker.js
```

Then start the client in another console:

```
$ node client.js
```

The broker crashes with:

```
$ node broker.js
client mqttjs_f8ae8b73 connected
/home/lms/src/aedes-crash-with-level/node_modules/msgpack-lite/lib/read-core.js:24
    if (!func) throw new Error("Invalid type: " + (type ? ("0x" + type.toString(16)) : type));
                     ^

Error: Invalid type: 0x�
    at Codec.decode (/home/lms/src/aedes-crash-with-level/node_modules/msgpack-lite/lib/read-core.js:24:22)
    at DecodeBuffer.fetch (/home/lms/src/aedes-crash-with-level/node_modules/msgpack-lite/lib/decode-buffer.js:26:21)
    at DecodeBuffer.read (/home/lms/src/aedes-crash-with-level/node_modules/msgpack-lite/lib/flex-buffer.js:166:28)
    at Object.decode (/home/lms/src/aedes-crash-with-level/node_modules/msgpack-lite/lib/decode.js:10:18)
    at /home/lms/src/aedes-crash-with-level/node_modules/aedes-persistence-level/persistence.js:398:24
    at /home/lms/src/aedes-crash-with-level/node_modules/levelup/lib/levelup.js:194:5
    at /home/lms/src/aedes-crash-with-level/node_modules/encoding-down/index.js:81:5
```
