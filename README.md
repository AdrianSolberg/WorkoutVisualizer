# Workout Visualizer

A web app for parsing and visualizing workout statistics from workout logs.

**Features include:**

- Parsing workout log from text to structured json format
- Exercise progression stats
- Weight progression chart
- Workout frequency chart
- All-time workout stats (workouts, sets, reps, volume, etc.)

Had several years of workout logs written in my notes app that I wanted to visualize in a dashboard in order to see progression and other fun statistics. The workout log had varying formatting, so the parser is designed specifically to handle my personal log. The app as a whole is also more of a personal tool for me, rather than a general purpose application.

![Dashboard](https://i.imgur.com/qs73RXy.png)

## Data Usage

You can use either simplified example data or upload your own personal data (must have correct format):

- **Example data:** Already included in `logs/workoutlog.txt` and parsed to `json_log_output/workouts.txt` for demo/testing.
- **Personal data:** Place your own data in `logs/workoutlog.txt` and run the python script `parser.py` to update `json_log_output/workouts.json`.

## Getting Started

### 1. Enter the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. View in browser

Open [http://localhost:5173/](http://localhost:5173/) in your browser.
