import DesktopNavigation from "./desktop-navigation";
import Logo from "./logo";
import MobileNavigation from "./mobile-navigation";
import SkipToContent from "@/components/skip-to-content";

export function Header({ surveyId }: { surveyId: string }) {
  return (
    <header className="z-10 bg-background flex fixed w-full h-16 items-center px-4 gap-6 justify-between md:justify-baseline border-b">
      <SkipToContent />
      <Logo />
      <DesktopNavigation surveyId={surveyId} />
      <MobileNavigation surveyId={surveyId} />
    </header>
  );
}
