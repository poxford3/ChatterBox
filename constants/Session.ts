interface Session {
    id: string,
    name: string,
    duration: number // in milliseconds
    date: Date,
    active: boolean,
    users: [User]
}