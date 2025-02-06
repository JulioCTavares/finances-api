import { SessionRepository } from '../../../domain/repository/session/session-repository'
import { UnauthorizedException } from '../../../shared/errors'
import { JwtService } from '../../../shared/security/jwt-services'

export class RefreshTokenUseCase {
    constructor(
        private refreshTokenRepository: SessionRepository,
        private jwtService: JwtService,
    ) {}

    async execute(refreshToken: string) {
        const storedToken =
            await this.refreshTokenRepository.findByToken(refreshToken)
        if (!storedToken || storedToken.revoked) {
            throw new Error('Invalid refresh token')
        }

        const payload = this.jwtService.verifyRefresh<{
            userId: string
            type: string
        }>(refreshToken)

        if (payload.type !== 'refresh') {
            throw new UnauthorizedException('Invalid refresh token')
        }

        const newAccessToken = this.jwtService.sign({ userId: payload.userId })

        return { access_token: newAccessToken }
    }
}
