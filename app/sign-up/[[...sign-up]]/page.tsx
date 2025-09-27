import { SignUp } from "@clerk/nextjs";
import {
  FileText,
  Layers,
  BarChart2,
  Palette,
  Download,
  Headphones,
} from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="grid flex-1 lg:grid-cols-2">
      <div className="hidden flex-1 items-center justify-end p-6 md:p-10 lg:flex">
        <ul className="max-w-sm space-y-8">
          <li>
            <div className="flex items-center gap-2">
              <FileText className="size-4" />
              <p className="font-semibold">Create Surveys Easily</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Get started for free by creating your first survey and collecting
              unlimited responses.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Layers className="size-4" />
              <p className="font-semibold">Unlimited Surveys (Pro)</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Upgrade to Surveyflow Pro to create and manage as many surveys as
              you need.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Palette className="size-4" />
              <p className="font-semibold">Custom Branding (Pro)</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Add your logo, colors, and themes to make your surveys look
              professional and on-brand.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <BarChart2 className="size-4" />
              <p className="font-semibold">Analytics & Insights (Pro)</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              View detailed response analytics and export results to CSV or
              Excel for deeper insights.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Download className="size-4" />
              <p className="font-semibold">Export Results (Pro)</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Download your survey data for reporting, presentations, and
              offline analysis.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Headphones className="size-4" />
              <p className="font-semibold">Priority Support (Pro)</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Get faster response times and dedicated help whenever you need
              assistance.
            </p>
          </li>
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 md:p-10 lg:justify-start">
        <SignUp />
      </div>
    </div>
  );
}
