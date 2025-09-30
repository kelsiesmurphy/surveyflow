"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SurveyPage() {
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
                <Link href={`/survey/${survey._id}`}>Take Survey</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
