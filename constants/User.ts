interface User {
    id: string,
    name: string
    password: string
    email: string,
    friends?: string[],
    workouts?: Workout[]
}