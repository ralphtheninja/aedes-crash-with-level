const mqtt = require('mqtt')
const client = mqtt.connect('tcp://localhost:1833')

client.on('message', (topic, message) => {
  console.log('client received', topic, message)
})
client.subscribe('foo')

// crashes the broker
client.publish('foo', 'bar', { qos: 2 })

// does not crash the broker
// client.publish('foo', 'bar', { qos: 1 })
