import { hash, verify } from 'argon2'
import { PasswordHasher } from '../../shared/security/password-hasher'

export class Argon2Hasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        return await hash(password)
    }
    compare(password: string, hashedPassword: string): Promise<boolean> {
        return verify(hashedPassword, password)
    }
}
