export class User {
    constructor(
        public id: string | null,
        public name: string,
        public email: string,
        public password: string,
        public createdAt?: Date,
    ) {}

    static create({
        name,
        email,
        password,
    }: {
        name: string
        email: string
        password: string
    }) {
        return new User(null, name, email, password, new Date())
    }
}
