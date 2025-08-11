"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/shadcn/ui/chart";
import type { LogItem } from "@/types/workoutLogTypes";
import { useEffect, useState } from "react";

export const description = "A bar chart with a custom label";

const chartConfig = {
    workouts: {
        label: "Workouts",
        color: "var(--chart-2)",
    },
    label: {
        color: "var(--background)",
    },
} satisfies ChartConfig;

interface ActivityBarChartInterface {
    data: LogItem[];
}

export function ActivityBarChart({ data }: ActivityBarChartInterface) {
    const [year, setYear] = useState<string>("2024");
    const [chartData, setChartData] = useState<{ month: string; workouts: number }[]>([]);

    useEffect(() => {
        const monthCounts: Record<string, number> = {};

        // Date format is YYYY-MM-DD
        data.filter((w) => w.date.startsWith(year) && w.exercises.length > 0).forEach((item) => {
            const month = item.date.split("-")[1];
            const key = month;
            monthCounts[key] = (monthCounts[key] || 0) + 1;
        });

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const chartData: { month: string; workouts: number }[] = [];
        monthNames.forEach((name, index) => {
            const key = String(index + 1).padStart(2, '0');
            chartData.push({
                month: name,
                workouts: monthCounts[key] || 0,
            });
        });
        setChartData(chartData);
    }, [year]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Workout Activity</CardTitle>
                <CardDescription>{year}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="workouts" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        {
                            <Bar
                                dataKey="workouts"
                                fill="var(--color-workouts)"
                                radius={4}
                            >
                                <LabelList
                                    dataKey="month"
                                    position="insideLeft"
                                    offset={8}
                                    className="fill-(--color-label)"
                                    fontSize={12}
                                />
                                <LabelList
                                    dataKey="workouts"
                                    position="right"
                                    offset={8}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        }
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Total workouts for {year}: {chartData.reduce((acc, curr) => acc + curr.workouts, 0)}
                </div>
            </CardFooter>
        </Card>
    );
}
