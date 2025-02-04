import { UserRepository } from '../../../domain/repository/user/user-repository'
import { UnauthorizedException } from '../../../shared/errors'
import { JwtService } from '../../../shared/security/jwt-services'
import { PasswordHasher } from '../../../shared/security/password-hasher'

interface LoginRequest {
    email: string
    password: string
}

interface LoginResponse {
    token: string
}

export class LoginUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
        private jwtService: JwtService,
    ) {}

    async execute({ email, password }: LoginRequest): Promise<LoginResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = await this.passwordHasher.compare(
            password,
            user.password,
        )

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = this.jwtService.sign({ id: user.id })

        return {
            token,
        }
    }
}
