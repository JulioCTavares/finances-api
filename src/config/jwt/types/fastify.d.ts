import '@fastify/jwt'

declare module 'fastify' {
    interface FastifyInstance {
        refreshJwt: {
            sign: (payload: object) => string
            verify: (token: string) => any
        }
    }
}
