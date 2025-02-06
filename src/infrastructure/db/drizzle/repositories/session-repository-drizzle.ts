import { eq } from 'drizzle-orm'
import { Session } from '../../../../domain/entities/session'
import { SessionRepository } from '../../../../domain/repository/session/session-repository'
import { db } from '../config'
import { sessions } from '../schemas/session'

export class SessionRepositoryDrizzle implements SessionRepository {
    async create(data: Session): Promise<void> {
        await db.insert(sessions).values({
            userId: data.userId,
            token: data.token,
            expiresAt: data.expiresAt,
            revoked: data.revoked,
        })
    }
    async findByToken(token: string): Promise<Session | null> {
        const [result] = await db
            .select()
            .from(sessions)
            .where(eq(sessions.token, token))
        if (result === null) {
            return null
        }
        return new Session(
            result.id,
            result.userId,
            result.token,
            result.expiresAt,
            result.revoked,
        )
    }

    async revoke(token: string): Promise<void> {
        await db
            .update(sessions)
            .set({ revoked: true })
            .where(eq(sessions.token, token))
    }
}
