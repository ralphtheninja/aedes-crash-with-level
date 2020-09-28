'use strict'

const Aedes = require('aedes')
const aedesPersistencelevel = require('aedes-persistence-level')
const net = require('net')
const level = require('level')

const aedes = Aedes({
  id: 'aedes-broker',
  persistence: aedesPersistencelevel(level('./db'))
})

const server = net.createServer(aedes.handle)

server.listen(1833, () => {
  aedes.publish({ topic: 'aedes/hello', payload: `I'm broker ${aedes.id}` })
})

aedes.on('subscribe', (subscriptions, client) => {
  const subs = subscriptions.map(s => s.topic).join('\n')
  console.log(`client ${client && client.id} subscribed to topics ${subs}`)
})

aedes.on('unsubscribe', (subscriptions, client) => {
  const subs = subscriptions.map(s => s.topic).join('\n')
  console.log(`client ${client && client.id} unsubscribed to topics ${subs}`)
})

aedes.on('client', (client) => {
  console.log(`client ${client && client.id} connected`)
})

aedes.on('clientDisconnect', (client) => {
  console.log(`client ${client && client.id} disconnected`)
})

aedes.on('clientError', (client, err) => {
  console.error('client error', client.id, err.message, err.stack)
})

aedes.on('publish', (packet, client) => {
  if (client) {
    console.log('message from client', client.id, packet)
  }
})
