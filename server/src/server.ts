import 'dotenv/config'

import cors from '@fastify/cors'

import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'

import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: 'spacetime',
})
app.get('/api/',async () => {
  return 'sdasdad'
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
function auth(instance: FastifyInstance<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, FastifyTypeProvider>, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void): void {
  throw new Error('Function not implemented.')
}

