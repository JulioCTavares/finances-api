export class Session {
    constructor(
        public id: string | null,
        public userId: string,
        public token: string,
        public expiresAt: Date,
        public revoked: boolean,
    ) {}

    static create({
        userId,
        token,
        expiresAt,
    }: {
        userId: string
        token: string
        expiresAt: Date
    }) {
        return new Session(null, userId, token, expiresAt, false)
    }
}
