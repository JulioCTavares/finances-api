import { User } from '../../entities/user'

export interface UserRepository {
    create(data: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
}
