import { Badge } from "@/shadcn/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

interface StatCardInterface {
    stat_name: string;
    stat_value: number;
    trend: number;
}

export function StatCard({ stat_name, stat_value, trend }: StatCardInterface) {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{stat_name}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {stat_value.toFixed(2)}kg
                </CardTitle>
                <CardAction>
                <Badge variant="outline">
                    <IconTrendingUp />
                    {trend > 0 ? "+" : ""}{trend.toFixed(2)}%
                </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    Trending {trend > 0 ? "up" : "down"} this month {trend > 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
                </div>
                <div className="text-muted-foreground">
                    {stat_name === "Weight" ? "Current body weight." : `Current estimated 1RM.`}
                </div>
            </CardFooter>
        </Card>
    )
}