interface Workout {
    id: string,
    duration: number
    type: "weight" | "cardio",
    exercises?: [Exercise]
}