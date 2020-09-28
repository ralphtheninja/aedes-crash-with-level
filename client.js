const mqtt = require('mqtt')
const client = mqtt.connect('tcp://localhost:1833')

client.on('message', (topic, message) => {
  console.log('client received', topic, message)
})
client.subscribe('foo')

client.publish('foo', 'bar', { qos: 2 })
