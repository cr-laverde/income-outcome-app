export class User {

    constructor(
        public uid: string,
        public name: string,
        public email: string
    ) {}

    static fromFirebae({ email, uid, name } : { email: string, uid: string, name: string }) {
        return new User(uid, name, email);
    }
}