"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Edit3 } from "lucide-react";
import { getConvexImageUrl } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function DashboardWrapper() {
  const surveys = useQuery(api.surveys.getAllSurveys, {});

  if (!surveys) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <p className="text-muted-foreground">Loading surveys…</p>
      </div>
    );
  }

  if (surveys.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold">No surveys yet</h2>
          <p className="text-sm text-muted-foreground">
            Create your first survey to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center">
      <div className="w-full max-w-6xl p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-6 tracking-tight">Your Surveys</h1>
        <Separator />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey) => (
            <Card
              key={survey._id}
              className="overflow-hidden border pt-0 border-border/60 hover:shadow-md transition-shadow duration-200"
            >
              <Link href={`/dashboard/${survey._id}`} className="space-y-4">
                {survey.coverImageStorageId && (
                  <div className="relative w-full h-40 bg-muted">
                    <Image
                      src={getConvexImageUrl(survey.coverImageStorageId)}
                      alt={survey.coverImageAlt ?? "Survey cover"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-0">
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-1 text-lg">
                      {survey.title}
                    </CardTitle>
                    <Badge variant={survey.isActive ? "default" : "secondary"}>
                      {survey.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="min-h-12">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {survey.description || "No description provided."}
                  </p>
                </CardContent>
              </Link>
              <CardFooter className="flex justify-between border-t">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/${survey._id}`}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/${survey._id}/responses`}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Responses
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
