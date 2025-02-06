import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
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

            if (error instanceof ZodError) {
                const formattedErrors = error.format()

                return reply.status(400).send({
                    status: 'error',
                    message: 'Validation failed',
                    errors: formattedErrors,
                })
            }

            console.error('Unexpected error:', error)
            return reply.status(500).send({ message: 'Internal server error' })
        },
    )
}
