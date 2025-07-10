import workoutsRaw from "../../../json_log_output/workouts.json"

export const get_current_weight = (morning: boolean): number => {
    for (let i = workoutsRaw.length - 1; i >= 0; i--) {
        const workout = workoutsRaw[i];
        if (morning && workout.morning_weight) {
            return Number(workout.morning_weight);
        } else if (!morning && workout.evening_weight) {
            return Number(workout.evening_weight);
        }
    }
    return 0; 
}

export const get_weight_trend = (morning: boolean): number => {
    const weights = workoutsRaw.map(workout => morning ? workout.morning_weight : workout.evening_weight).filter(Boolean);
    if (weights.length < 2) return 0;

    const latestWeight = Number(weights[weights.length - 1]);
    const firstWeight = Number(weights[0]);

    return ((latestWeight - firstWeight) / firstWeight) * 100;
}
