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
    CardAction,
    CardContent,
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
import { ToggleGroup, ToggleGroupItem } from "@/shadcn/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";

export const description = "A bar chart with a custom label";

const chartConfig = {
    workouts: {
        label: "Workouts",
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
        const startDate = new Date(data.find(item => item.date)?.date ?? "");
        const currentDate = new Date();

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
            if (Number(year) > startDate.getFullYear() && Number(year) < currentDate.getFullYear() || (Number(year) === startDate.getFullYear() && index >= startDate.getMonth()) || (Number(year) === currentDate.getFullYear() && index <= currentDate.getMonth())) {
                chartData.push({
                    month: name,
                    workouts: monthCounts[key] || 0,
                });
            }
            });
        setChartData(chartData);
    }, [year]);

    const getYears = () => {
        const startYear = Number(data.find(item => item.date)?.date.slice(0, 4));
        const currentYear = new Date().getFullYear();
        const yearItems = [];
        for (let year = startYear; year <= currentYear; year++) {
            yearItems.push(year);
        }
        return yearItems;
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle>Workout Activity</CardTitle>
                    <CardAction className="pt-2">
                        <ToggleGroup
                            type="single"
                            value={year}
                            onValueChange={setYear}
                            variant="outline"
                            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                        >
                            {getYears().map((year) => (
                                <ToggleGroupItem key={year} value={String(year)}>
                                    {year}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger
                                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                                size="sm"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder={year} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {getYears().map((year) => (
                                    <SelectItem key={year} value={String(year)} className="rounded-lg">
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardAction>
                </div>
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
