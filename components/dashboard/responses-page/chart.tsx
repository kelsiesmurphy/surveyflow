import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";
import { AreaChart, CartesianGrid, XAxis, Area } from "recharts";
import { format } from "date-fns";
import { Id } from "@/convex/_generated/dataModel";

type Report = {
  survey: {
    _id: Id<"surveys">;
    title: string;
    description: string | undefined;
  };
  stats: {
    totalSessions: number;
    completedCount: number;
    abandonedCount: number;
    completionRate: number;
  };
  sessions: {
    sessionId: Id<"survey_sessions">;
    respondentId: string;
    startedAt: number;
    completedAt: number | null;
    status: string;
    answersCount: number;
  }[];
};

export default function Chart({ report }: { report: Report }) {
  const chartData = report.sessions.map(
    (s: { startedAt: string | number | Date; status: string }) => ({
      date: format(new Date(s.startedAt), "MM/dd"),
      completed: s.status === "Completed" ? 1 : 0,
      abandoned: s.status === "Abandoned" ? 1 : 0,
    })
  );

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "var(--chart-1)",
    },
    abandoned: {
      label: "Abandoned",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completion Trend</CardTitle>
        <CardDescription>Daily breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px] w-full" config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="completed"
              type="monotone"
              fill="var(--color-completed)"
              stroke="var(--color-completed)"
              fillOpacity={0.3}
              stackId="a"
            />
            <Area
              dataKey="abandoned"
              type="monotone"
              fill="var(--color-abandoned)"
              stroke="var(--color-abandoned)"
              fillOpacity={0.3}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
