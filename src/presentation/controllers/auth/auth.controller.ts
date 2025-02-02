import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Dependencies } from '../dependencies'

export class AuthController {
    static async register(req: FastifyRequest, rep: FastifyReply) {
        const registerSchema = z.object({
            name: z.string().min(3),
            email: z.string().email(),
            password: z.string().min(6),
        })

        const { name, email, password } = registerSchema.parse(req.body)

        const useCase = Dependencies.getRegisterUserUseCase()

        const { user } = await useCase.execute({ name, email, password })

        return rep.status(201).send({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        })
    }
}
