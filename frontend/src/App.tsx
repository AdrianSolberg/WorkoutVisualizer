import { ChartLine } from "./components/ChartLine";
import { SiteHeader } from "./components/SiteHeader";
import { StatCards } from "./components/StatCards";
import { Card } from "./shadcn/ui/card";
import workoutLog from "../../json_log_output/workouts.json";
import { useState } from "react";
import type { LogItem } from "./types/workoutLogTypes";
import { ActivityBarChart } from "./components/ActivityBarChart";

function App() {
    const [timeRange, setTimeRange] = useState<string>("all_time");

    const filteredData: LogItem[] = (workoutLog as LogItem[]).filter(
        (item: LogItem) => {
            if (timeRange === "all_time") {
                return true;
            }

            const workout_date = new Date(item.date);
            let daysToSubtract = 90;
            if (timeRange === "year") {
                daysToSubtract = 365;
            }

            const startDate = new Date();
            startDate.setDate(startDate.getDate() - daysToSubtract);
            return workout_date >= startDate;
        },
    );

    return (
        <Card className="m-2 py-0 gap-1">
            <SiteHeader />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <StatCards data={filteredData} />
                        <div className="px-4 lg:px-6">
                            <ChartLine
                                data={filteredData.filter(
                                    (w: LogItem) => w.morning_weight !== null,
                                )}
                                timeRange={timeRange}
                                setTimeRange={setTimeRange}
                            />
                        </div>
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                            <ActivityBarChart data={workoutLog as LogItem[]} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default App;
