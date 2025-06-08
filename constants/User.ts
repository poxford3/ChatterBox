interface User {
    id: number,
    username: string,
    name: string
    password: string
    email: string,
    profilePicBase64: string,
    roles: Role[]
}