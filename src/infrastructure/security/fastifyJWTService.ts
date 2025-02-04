import { FastifyInstance } from 'fastify'
import { JwtService } from '../../shared/security/jwt-services'

export class FastifyJwtService implements JwtService {
    constructor(private app: FastifyInstance) {}

    sign(payload: object): string {
        return this.app.jwt.sign(payload)
    }

    verify(token: string): string {
        return this.app.jwt.verify(token)
    }
}
