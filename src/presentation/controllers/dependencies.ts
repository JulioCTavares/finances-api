import { FastifyInstance } from 'fastify'
import { LoginUseCase } from '../../application/useCases/auth/login'
import { RefreshTokenUseCase } from '../../application/useCases/auth/refreshToken'
import { RegisterUserUseCase } from '../../application/useCases/user/register-user'
import { SessionRepository } from '../../domain/repository/session/session-repository'
import { UserRepository } from '../../domain/repository/user/user-repository'
import { SessionRepositoryDrizzle } from '../../infrastructure/db/drizzle/repositories/session-repository-drizzle'
import { UserRepositoryDrizzle } from '../../infrastructure/db/drizzle/repositories/user-repository-drizzle'
import { Argon2Hasher } from '../../infrastructure/security/argon2-hasher'
import { FastifyJwtService } from '../../infrastructure/security/fastifyJWTService'
import { server } from '../../server'
import { JwtService } from '../../shared/security/jwt-services'
import { PasswordHasher } from '../../shared/security/password-hasher'

export class Dependencies {
    //Repositories
    private static _userRepository: UserRepository
    private static _refreshTokenRepository: SessionRepository

    //UseCases
    private static _registerUserUseCase: RegisterUserUseCase
    private static _loginUseCase: LoginUseCase
    private static _refreshTokenUseCase: RefreshTokenUseCase

    //Shared
    private static _passwordHasher: PasswordHasher
    private static _jwtService: JwtService

    //Repositories
    static getUserRepository(): UserRepository {
        if (!Dependencies._userRepository) {
            Dependencies._userRepository = new UserRepositoryDrizzle()
        }
        return Dependencies._userRepository
    }

    static getRefreshTokenRepository(): SessionRepository {
        if (!Dependencies._refreshTokenRepository) {
            Dependencies._refreshTokenRepository =
                new SessionRepositoryDrizzle()
        }
        return Dependencies._refreshTokenRepository
    }

    //Shared
    static getPasswordHasher(): PasswordHasher {
        if (!Dependencies._passwordHasher) {
            Dependencies._passwordHasher = new Argon2Hasher()
        }

        return Dependencies._passwordHasher
    }

    static getJwtService(app: FastifyInstance): JwtService {
        if (!Dependencies._jwtService) {
            Dependencies._jwtService = new FastifyJwtService(app)
        }
        return Dependencies._jwtService
    }

    //UseCases
    static getRegisterUserUseCase(): RegisterUserUseCase {
        if (!Dependencies._registerUserUseCase) {
            Dependencies._registerUserUseCase = new RegisterUserUseCase(
                Dependencies.getUserRepository(),
                Dependencies.getPasswordHasher(),
            )
        }
        return Dependencies._registerUserUseCase
    }

    static getLoginUseCase(): LoginUseCase {
        if (!Dependencies._loginUseCase) {
            Dependencies._loginUseCase = new LoginUseCase(
                Dependencies.getUserRepository(),
                Dependencies.getPasswordHasher(),
                Dependencies.getJwtService(server),
                Dependencies.getRefreshTokenRepository(),
            )
        }
        return Dependencies._loginUseCase
    }

    static getRefreshTokenUseCase(): RefreshTokenUseCase {
        if (!Dependencies._refreshTokenUseCase) {
            Dependencies._refreshTokenUseCase = new RefreshTokenUseCase(
                Dependencies.getRefreshTokenRepository(),
                Dependencies.getJwtService(server),
            )
        }
        return Dependencies._refreshTokenUseCase
    }
}
