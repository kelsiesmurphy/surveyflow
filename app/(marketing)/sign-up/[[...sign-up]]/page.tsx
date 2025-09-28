import { SignUpSkeleton } from "@/components/skeletons/sign-up-skeleton";
import { SignUp } from "@clerk/nextjs";
import { FileText, Layers, BarChart2, Palette } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex-1 flex items-center">
      <div className="flex-1 p-6 md:p-10 flex gap-8 md:gap-20 items-center">
        <ul className="max-w-sm space-y-8">
          <li>
            <div className="flex items-center gap-2">
              <FileText className="size-4" />
              <p className="font-semibold">Create Surveys Quickly</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Launch your first survey in minutes and start collecting responses
              immediately.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Layers className="size-4" />
              <p className="font-semibold">Flexible Plans</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Start for free or upgrade to access more surveys, custom branding,
              and advanced analytics.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <BarChart2 className="size-4" />
              <p className="font-semibold">Insights & Analytics</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              See results at a glance with built-in charts and reporting tools.
            </p>
          </li>
          <li>
            <div className="flex items-center gap-2">
              <Palette className="size-4" />
              <p className="font-semibold">Professional Look</p>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Customize your surveys' appearance to match your style or brand.
            </p>
          </li>
        </ul>
        <SignUp fallback={<SignUpSkeleton />} />
      </div>
    </div>
  );
}
