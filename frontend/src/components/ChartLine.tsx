"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/shadcn/ui/chart";
export const description = "An interactive line chart";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/shadcn/ui/toggle-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import type { LogItem } from "@/types/workoutLogTypes";

interface ChartLineInterface {
    data: LogItem[];
    timeRange: string;
    setTimeRange: (value: string) => void;
}

const chartConfig = {
    weight: {
        label: "Weight",
    },
    morning_weight: {
        label: "Morning Weight",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function ChartLine({
    data,
    timeRange,
    setTimeRange,
}: ChartLineInterface) {
    const [activeChart, setActiveChart] = useState<string>("morning_weight");

    return (
        <Card className="py-4 sm:py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0 pt-4">
                    <CardTitle>{chartConfig.morning_weight.label}</CardTitle>
                    <CardDescription className="pb-4">
                        Showing morning weight over time
                    </CardDescription>
                </div>
                <CardAction className="pb-3 sm:pb-0 pt-4">
                    <ToggleGroup
                        type="single"
                        value={activeChart}
                        onValueChange={setActiveChart}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">
                            Morning weight
                        </ToggleGroupItem>
                        <ToggleGroupItem value="90d">
                            Incline Dumbell Press
                        </ToggleGroupItem>
                        <ToggleGroupItem value="year">
                            Military press
                        </ToggleGroupItem>
                        <ToggleGroupItem value="all_time">
                            Pullups
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={activeChart} onValueChange={setActiveChart}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Morning weight" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem
                                value="morning_weight"
                                className="rounded-lg"
                            >
                                Morning weight
                            </SelectItem>
                            <SelectItem value="skråbenk" className="rounded-lg">
                                Incline dumbell press
                            </SelectItem>
                            <SelectItem
                                value="militærpress"
                                className="rounded-lg"
                            >
                                Military press
                            </SelectItem>
                            <SelectItem value="pullups" className="rounded-lg">
                                Pullups
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
                <CardAction className="px-6 pb-3 sm:pb-0 pt-4">
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">
                            Last 3 months
                        </ToggleGroupItem>
                        <ToggleGroupItem value="year">
                            Last year
                        </ToggleGroupItem>
                        <ToggleGroupItem value="all_time">
                            All time
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="year" className="rounded-lg">
                                Last year
                            </SelectItem>
                            <SelectItem value="all_time" className="rounded-lg">
                                All time
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <YAxis
                            domain={["dataMin - 1", "dataMax + 1"]}
                            tickLine={false}
                            axisLine={false}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey={"morning_weight"}
                            type="monotone"
                            stroke={`var(--color-${"morning_weight"})`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
