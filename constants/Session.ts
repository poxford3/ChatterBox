interface Session {
    id: string,
    name: string,
    duration: number // in milliseconds
    created?: Date,
    active: boolean,
    type: SessionType,
    exercises?: Exercise[],
    userIds: number[]
}