import { Session } from '../../entities/session'

export interface SessionRepository {
    create(data: Session): Promise<void>
    findByToken(token: string): Promise<Session | null>
    revoke(token: string): Promise<void>
}
