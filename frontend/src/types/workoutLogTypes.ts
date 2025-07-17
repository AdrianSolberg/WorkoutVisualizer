export interface LogItem {
    date: string;
    morning_weight?: number; // in kg
    evening_weight?: number; // in kg
    exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets: Set[];
}

export interface Set {
    weight: number; // in kg
    reps: number;
}