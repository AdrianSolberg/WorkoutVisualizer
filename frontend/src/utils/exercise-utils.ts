import workoutsRaw from "../../../json_log_output/workouts.json"
import { one_rep_max } from "./1RM-calc";

export const get_current_max = (exercise: string):number => {
    for (let i = workoutsRaw.length - 1; i >= 0; i--) {
        const workout = workoutsRaw[i];
        if (workout.exercises.map(e => e.name).includes(exercise)) {
            const exerciseObj = workout.exercises.find(e => e.name === exercise);
            if (exerciseObj && exerciseObj.sets && exerciseObj.sets.length > 0) {
                const set = exerciseObj.sets[0];
                const weight = Number(set.weight) || 0;
                const reps = 'reps' in set && set.reps !== undefined ? Number(set.reps) : 0;
                return one_rep_max(weight, reps);
            }
        }
    }
    return 0;
}

export const get_current_max_trend = (exercise: string): number => {
    const currentMax = get_current_max(exercise);
    for (const workout of workoutsRaw) {
        if (workout.exercises.map(e => e.name).includes(exercise)) {
            const exerciseObj = workout.exercises.find(e => e.name === exercise);
            if (exerciseObj && exerciseObj.sets && exerciseObj.sets.length > 0) {
                const set = exerciseObj.sets[0];
                const weight = Number(set.weight) || 0;
                const reps = 'reps' in set && set.reps !== undefined ? Number(set.reps) : 0;
                const prevMax = one_rep_max(weight, reps);
                return ((currentMax - prevMax) / prevMax) * 100;
            }
        }
    }
    return 0;
}
