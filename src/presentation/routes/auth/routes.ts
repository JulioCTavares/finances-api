import { FastifyInstance } from 'fastify'
import { AuthController } from '../../controllers/auth/auth.controller'

export async function authRoutes(app: FastifyInstance) {
    app.post('/auth/register', AuthController.register)
    app.post('/auth/login', AuthController.login)
    app.post('/auth/refresh', AuthController.refreshToken)
}
