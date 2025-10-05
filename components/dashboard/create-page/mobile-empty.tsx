import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Id } from "@/convex/_generated/dataModel";
import { BarChart3, Link2, Smartphone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MobileEmpty({
  surveyId,
}: {
  surveyId: Id<"surveys">;
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Smartphone />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>This page is not yet available on mobile devices</EmptyTitle>
      <EmptyDescription>
        We&apos;re working on it, in the meantime check responses or generate a share
        link
      </EmptyDescription>
      <EmptyContent className="flex-row justify-center">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/${surveyId}/share`}>
            <Link2 className="mr-2 h-4 w-4" />
            Share
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/${surveyId}/responses`}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Responses
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
