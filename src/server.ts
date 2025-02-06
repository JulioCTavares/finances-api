import fastify from 'fastify'
import { registerJWT } from './config/jwt/jwt'
import { registerErrorMiddleware } from './config/middlewares'
import { authMiddleware } from './config/middlewares/auth-middleware'
import { authRoutes } from './presentation/routes/auth/routes'

export const server = fastify({
    logger: true,
})

registerJWT(server)
server.register(authRoutes)
registerErrorMiddleware(server)

server.get('/health', { preHandler: authMiddleware }, (req, reply) => {
    return reply.send({ message: 'Its alive' })
})

server.listen(
    {
        port: 4000,
        host: '0.0.0.0',
    },
    (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    },
)
