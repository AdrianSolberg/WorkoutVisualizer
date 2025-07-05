import re
import json

# Convert dd.mm.yyyy to yyyy-mm-dd
def parse_date(date_str):
    day, month, year = date_str.split(".")
    return f"{year}-{month.zfill(2)}-{day.zfill(2)}"

def parse_weight(weight_str):
    if not weight_str:
        return None
    return float(weight_str.replace("kg", "").replace(",", "."))

with open('logs/traininglog2.txt', 'r') as file:
    lines = file.readlines()

workouts = []

lines.pop(0)  # Remove the header line
workout = None
for line in lines:
    line = line.strip()

    # Blank line means end of workout
    if not line and workout is not None:
        workouts.append(workout)
        workout = None
        continue
    elif not line: 
        continue


    # New workout starts with a date and body weight (morning and evening)
    if re.match(r'^\d{2}\.\d{2}\.\d{4}', line):
        date_and_weights = line.split(" ")
        date = parse_date(date_and_weights[0])
        morning_weight = parse_weight(date_and_weights[1]) if len(date_and_weights) > 1 and date_and_weights[1] != "?" else None
        evening_weight = parse_weight(date_and_weights[2]) if len(date_and_weights) > 2 and date_and_weights[2] != "?" else None

        workout = {
            "date": date,
            "morning_weight": morning_weight,
            "evening_weight": evening_weight,
            "exercises": []
        }
        continue

    # If the line contains "km", it indicates a cardio workout, so we skip it for now
    if "km" in line or "90 grader" in line:
        continue

    # If the line starts with a digit, it indicates weigts and reps for an exercise
    if line[0].isdigit() and workout["exercises"] != None:
        parts = line.split(" ")

        sets = []

        for part in parts:
            if "kg" in part:
                sets.append({"weight": part})
            elif "r" in part:
                if len(sets) == 0:
                    sets.append({"weight": None, "reps": part})
                elif "reps" not in sets[-1]:
                    sets[-1]["reps"] = part
                else:
                    sets.append({"weight": sets[-1]["weight"], "reps": part})

        if len(workout["exercises"]) > 0 and len(sets) > 0:
            workout["exercises"][-1]["sets"] = sets

        continue
    
    # If the line starts with a letter, it indicates an exercise
    if line[0].isalpha():
        exercise = {
            "name": line,
        }
        workout.setdefault("exercises", []).append(exercise)
        continue

if workout is not None:
    workouts.append(workout)  # Append the last workout if it exists

with open('json_log_output/workouts.json', 'w') as f:
    json.dump(workouts, f, indent=4)