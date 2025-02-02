import { User } from '../../../domain/entities/user'
import { UserRepository } from '../../../domain/repository/user/user-repository'
import { BadRequestException } from '../../../shared/errors'
import { PasswordHasher } from '../../../shared/security/password-hasher'

interface RegisterUserRequest {
    name: string
    email: string
    password: string
}

interface RegisterUserResponse {
    user: Partial<User>
}

export class RegisterUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
    ) {}

    async execute({
        name,
        email,
        password,
    }: RegisterUserRequest): Promise<RegisterUserResponse> {
        const existingUser = await this.userRepository.findByEmail(email)

        if (existingUser) {
            throw new BadRequestException('Email already in use', { email })
        }

        const hashedPassword = await this.passwordHasher.hash(password)
        const user = User.create({ name, email, password: hashedPassword })

        const createdUser = await this.userRepository.create(user)
        return { user: createdUser }
    }
}
