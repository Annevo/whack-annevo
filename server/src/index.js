import path from 'path'
import express from 'express'
import socket from 'socket.io'
import {createStore} from 'redux'

import startServer from './server'
import BotSwam from './bot'
import reducer from './reducers'

const port = process.env.PORT || 3000
const index = path.join(__dirname, 'index.html')

const server = express()
  .use((req, res) => res.sendFile(index) )
  .listen(port, () => console.log(`Listening on ${ port }`))

const io = socket(server)
const store = createStore(reducer)
const botCount = process.env.NODE_ENV === 'production' ? 0 : 3

const bots = BotSwam(botCount, port)

startServer({ io, store, bots })
