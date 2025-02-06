import { FastifyInstance } from 'fastify'
import { JwtService } from '../../shared/security/jwt-services'

export class FastifyJwtService implements JwtService {
    constructor(private app: FastifyInstance) {}

    sign(payload: object): string {
        return this.app.jwt.sign(payload)
    }

    signRefresh(payload: object): string {
        return this.app.refreshJwt.sign(payload)
    }

    verify(token: string): any {
        return this.app.jwt.verify(token)
    }

    verifyRefresh(token: string): any {
        return this.app.refreshJwt.verify(token)
    }
}
