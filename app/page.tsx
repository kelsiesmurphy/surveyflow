import { Metadata } from "next";
import LandingPage from "../components/landing-page";
import Footer from "../components/footer";
import { brand } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: `Home | ${brand.name}`,
  description: brand.description,
};

export default function LandingPageWrapper() {
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <LandingPage />
      <Footer />
    </div>
  );
}
