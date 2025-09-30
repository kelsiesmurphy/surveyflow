"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Link from "next/link";

export default function DashboardWrapper() {
  const surveys = useQuery(api.surveys.getAllSurveys, {});

  if (!surveys) return <div>Loading…</div>;
  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full max-w-xl p-4 space-y-4">
        <h1 className="text-2xl font-bold">Surveys (Development Only)</h1>
        {surveys.map((survey) => (
          <Card key={survey._id}>
            <CardHeader>
              <CardTitle>{survey.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{survey.description}</p>
              <Button asChild>
                <Link href={`/dashboard/${survey._id}`}>Edit Survey</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
