import { SessionRepository } from '../../../domain/repository/session/session-repository'
import { UserRepository } from '../../../domain/repository/user/user-repository'
import { UnauthorizedException } from '../../../shared/errors'
import { JwtService } from '../../../shared/security/jwt-services'
import { PasswordHasher } from '../../../shared/security/password-hasher'

interface LoginRequest {
    email: string
    password: string
}

interface LoginResponse {
    access_token: string
    refresh_token: string
}

export class LoginUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
        private jwtService: JwtService,
        private refreshTokenRepository: SessionRepository,
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
        const refreshToken = this.jwtService.signRefresh({
            userId: user.id,
            type: 'refresh',
        })

        await this.refreshTokenRepository.create({
            id: null,
            userId: user.id ?? '',
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            revoked: false,
        })

        return {
            access_token: token,
            refresh_token: refreshToken,
        }
    }
}
