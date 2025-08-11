import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/ui/card";
import type { LogItem } from "@/types/workoutLogTypes";

interface FactCardsInterface {
    data: LogItem[];
}

export function FactCards({ data }: FactCardsInterface) {

    let startDate = data.find(item => item.date)?.date ?? null;
    let endDate = data.length > 0 ? data[data.length - 1].date : null;

    let totalWorkouts = 0;
    let totalSets = 0;
    let totalReps = 0;
    let totalVolume = 0;

    for (const item of data) {
        if (item.exercises.length > 0) totalWorkouts++;
        for (const exercise of item.exercises) {
            const sets = exercise.sets ?? [];
            totalSets += sets.length;
            for (const set of sets) {
                totalReps += set.reps ?? 0;
                totalVolume += (set.reps ?? 0) * (set.weight ?? 0);
            }
        }
    }

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>All time stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 grid-rows-6 gap-4 flex-1 h-full md:grid-cols-2 md:grid-rows-3">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Start date</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {startDate ? new Date(startDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>End date</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {endDate ? new Date(endDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"}
                            </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total workouts</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {totalWorkouts.toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total volume</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {Math.round(totalVolume).toLocaleString()} kg
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total sets</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {totalSets.toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total reps</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {Math.round(totalReps).toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </CardContent>
        </Card>
    );
}
