import fastifyJwt from '@fastify/jwt'
import { FastifyInstance } from 'fastify'

export function registerJWT(app: FastifyInstance) {
    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET!,
        sign: {
            expiresIn: process.env.JWT_EXPIRES_IN!,
        },
    })
}
