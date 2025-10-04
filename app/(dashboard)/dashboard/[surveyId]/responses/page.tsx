"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";

import { DataTable } from "@/components/dashboard/responses-page/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

type SessionRow = {
  sessionId: string;
  respondentId: string;
  startedAt: number;
  completedAt: number | null;
  status: string;
  answersCount: number;
};

export default function ResponsesPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId: rawSurveyId } = use(params);
  const surveyId = rawSurveyId as Id<"surveys">;

  const report = useQuery(api.surveys.getSurveySessionsReport, { surveyId });

  if (!report) return <div>Loading…</div>;

  const chartData = report.sessions.map((s) => ({
    date: format(new Date(s.startedAt), "MM/dd"),
    completed: s.status === "Completed" ? 1 : 0,
    abandoned: s.status === "Abandoned" ? 1 : 0,
  }));

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

  const columns: ColumnDef<SessionRow>[] = [
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "respondentId",
      header: "Respondent",
    },
    {
      accessorKey: "answersCount",
      header: "Answers",
    },
    {
      accessorKey: "startedAt",
      header: "Started",
      cell: ({ row }) => format(new Date(row.getValue("startedAt")), "PPpp"),
    },
    {
      accessorKey: "completedAt",
      header: "Completed",
      cell: ({ row }) =>
        row.getValue("completedAt")
          ? format(new Date(row.getValue("completedAt")), "PPpp")
          : "—",
    },
  ];

  return (
    <div className="p-6 flex-1 flex justify-center">
      <div className="flex-1 max-w-6xl space-y-8">
        <h1 className="text-2xl font-bold">
          Responses for {report.survey.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Completion Rate</CardTitle>
              <CardDescription>
                {report.stats.completedCount} of {report.stats.totalSessions}{" "}
                sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {report.stats.completionRate.toFixed(0)}%
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
              <CardDescription>Total finished surveys</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {report.stats.completedCount}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Abandoned</CardTitle>
              <CardDescription>Exited before finish</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {report.stats.abandonedCount}
            </CardContent>
          </Card>
        </div>
        {/* Chart */}
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
        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Sessions</CardTitle>
            <CardDescription>
              {report.sessions.length} total survey attempts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={report.sessions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
