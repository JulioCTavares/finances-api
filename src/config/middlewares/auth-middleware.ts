import { FastifyReply, FastifyRequest } from 'fastify'
import { UnauthorizedException } from '../../shared/errors'

export async function authMiddleware(
    req: FastifyRequest,
    _reply: FastifyReply,
) {
    try {
        const token = req.headers['authorization']?.split(' ')[1] // "Bearer <token>"

        if (!token) {
            throw new UnauthorizedException('Access token is required')
        }
        await req.jwtVerify()
    } catch (err) {
        throw new UnauthorizedException('Unauthorized')
    }
}
