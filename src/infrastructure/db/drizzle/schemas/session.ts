import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

export const sessions = pgTable('sessions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    token: varchar('token', { length: 512 }).notNull(),
    expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
    revoked: boolean('revoked').default(false).notNull(),
})
