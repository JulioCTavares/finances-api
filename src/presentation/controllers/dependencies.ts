import { RegisterUserUseCase } from '../../application/useCases/user/register-user'
import { UserRepository } from '../../domain/repository/user/user-repository'
import { UserRepositoryDrizzle } from '../../infrastructure/db/drizzle/repositories/user-repository-drizzle'
import { Argon2Hasher } from '../../infrastructure/security/argon2-hasher'
import { PasswordHasher } from '../../shared/security/password-hasher'

export class Dependencies {
    //Repositories
    private static _userRepository: UserRepository

    //UseCases
    private static _registerUserUseCase: RegisterUserUseCase

    //Shared
    private static _passwordHasher: PasswordHasher

    static getUserRepository(): UserRepository {
        if (!Dependencies._userRepository) {
            Dependencies._userRepository = new UserRepositoryDrizzle()
        }
        return Dependencies._userRepository
    }

    static getPasswordHasher(): PasswordHasher {
        if (!Dependencies._passwordHasher) {
            Dependencies._passwordHasher = new Argon2Hasher()
        }

        return Dependencies._passwordHasher
    }

    static getRegisterUserUseCase(): RegisterUserUseCase {
        if (!Dependencies._registerUserUseCase) {
            Dependencies._registerUserUseCase = new RegisterUserUseCase(
                Dependencies.getUserRepository(),
                Dependencies.getPasswordHasher(),
            )
        }
        return Dependencies._registerUserUseCase
    }
}
