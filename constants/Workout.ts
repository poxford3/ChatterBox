interface Workout {
    id: string,
    type: "weight" | "cardio",
    exercises?: [Exercise]
}