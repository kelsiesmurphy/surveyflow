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

import { DataTable } from "@/components/dashboard/responses-page/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Chart from "@/components/dashboard/responses-page/chart";

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

  const columns: ColumnDef<SessionRow>[] = [
    {
      accessorKey: "status",
      header: "Status",
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
    <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
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
        <Chart report={report} />
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
