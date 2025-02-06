import fastifyJwt from '@fastify/jwt'
import { FastifyInstance } from 'fastify'

export function registerJWT(app: FastifyInstance) {
    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET!,
        sign: {
            expiresIn: process.env.JWT_EXPIRES_IN!,
        },
    })

    app.decorate('refreshJwt', {
        sign: (payload: object) => {
            return app.jwt.sign(payload, {
                key: process.env.JWT_REFRESH_SECRET as string,
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
            })
        },
        verify: (token: string) => {
            return app.jwt.verify(token, {
                key: process.env.JWT_REFRESH_SECRET as string,
            })
        },
    })
}
