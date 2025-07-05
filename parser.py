with open('logs/traininglog2.txt', 'r') as file:
    lines = file.readlines()

workouts = []

lines.pop(0)  # Remove the header line
workout = None
for line in lines:
    line = line.strip()
    if line.count(".") >= 2:
        date_and_weights = line.split(" ")
        date = date_and_weights[0]
        morning_weight = date_and_weights[1] if len(date_and_weights) > 1 and date_and_weights[1] != "?" else None
        evening_weight = date_and_weights[2] if len(date_and_weights) > 2 and date_and_weights[2] != "?" else None

        workout = {
            "date": date,
            "morning_weight": morning_weight,
            "evening_weight": evening_weight
        }
        workouts.append(workout)

print("Parsed workouts: ", workouts)