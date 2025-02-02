import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { BaseException } from '../../shared/errors/base-exception'

export function registerErrorMiddleware(app: FastifyInstance) {
    app.setErrorHandler(
        (error: Error, request: FastifyRequest, reply: FastifyReply) => {
            if (error instanceof BaseException) {
                return reply.status(error.statusCode).send({
                    message: error.message,
                    details: error.details,
                })
            }

            console.error('Unexpected error:', error)
            return reply.status(500).send({ message: 'Internal server error' })
        },
    )
}
