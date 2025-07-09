import workoutsRaw from "../../../json_log_output/workouts.json"

export const get_current_weight = (morning: boolean): number => {
    for (let i = workoutsRaw.length - 1; i >= 0; i--) {
        const workout = workoutsRaw[i];
        console.log(workout);
        if (morning && workout.morning_weight) {
            return Number(workout.morning_weight);
        } else if (!morning && workout.evening_weight) {
            return Number(workout.evening_weight);
        }
    }
    return 0; 
}
