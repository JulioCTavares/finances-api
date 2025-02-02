import { eq } from 'drizzle-orm'
import { User } from '../../../../domain/entities/user'
import { UserRepository } from '../../../../domain/repository/user/user-repository'
import { db } from '../config'
import { users } from '../schemas'

export class UserRepositoryDrizzle implements UserRepository {
    async create(data: User): Promise<User> {
        const [userInserted] = await db
            .insert(users)
            .values({
                name: data.name,
                email: data.email,
                password: data.password,
            })
            .returning()

        return new User(
            userInserted.id,
            userInserted.name,
            userInserted.email,
            userInserted.password,
            userInserted.createdAt!,
        )
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await db.select().from(users).where(eq(users.email, email))

        return user.length > 0
            ? new User(
                  user[0].id,
                  user[0].name,
                  user[0].email,
                  user[0].password,
                  user[0].createdAt!,
              )
            : null
    }
}
